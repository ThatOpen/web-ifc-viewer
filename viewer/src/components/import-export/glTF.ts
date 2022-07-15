import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  BufferAttribute,
  BufferGeometry,
  Group,
  Material,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial
} from 'three';
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { IFCPROJECT } from 'web-ifc';
import { IFCManager } from 'web-ifc-three/IFC/components/IFCManager';
import { IfcComponent } from '../../base-types';
import { IfcContext } from '../context';
import { IfcManager } from '../ifc';
import { disposeMeshRecursively } from '../../utils/ThreeUtils';
import { StoreyManager } from '../display/plans/storey-manager';

export interface ExportConfig {
  ifcFileUrl: string;
  getProperties?: boolean;
  categories?: { [categoryName: string]: number[] };
  splitByFloors?: boolean;
  maxJSONSize?: number;
  onProgress?: (progress: number, total: number, process: string) => void;
  coordinationMatrix?: Matrix4;
}

// If there are no geometry of a group of categories, it returns "null" as result
// because it makes no sense to create an empty gltf file
export interface ExportResponse {
  gltf: {
    [categoryName: string]: {
      [floorName: string]: {
        height: number;
        file: File | null;
      };
    };
  };
  json: File[];
  coordinationMatrix: number[];
  id: string;
}

export interface IdsByFloorplan {
  [p: string]: { height: number; ids: Set<number> };
}

export class GLTFManager extends IfcComponent {
  GLTFModels: { [modelID: number]: Group } = {};

  private loader = new GLTFLoader();
  private exporter = new GLTFExporter();
  private tempIfcLoader: IFCLoader | null = null;
  private allFloors = 'allFloors';
  private allCategories = 'allCategories';

  private stories = new StoreyManager();

  options = {
    trs: false,
    onlyVisible: false,
    truncateDrawRange: true,
    binary: true,
    maxTextureSize: 0
  };

  constructor(private context: IfcContext, private IFC: IfcManager) {
    super(context);
  }

  dispose() {
    (this.loader as any) = null;
    (this.exporter as any) = null;
    const models = Object.values(this.GLTFModels);
    models.forEach((model) => {
      model.removeFromParent();
      model.children.forEach((child) => disposeMeshRecursively(child as Mesh));
    });
    (this.GLTFModels as any) = null;
    this.stories.dispose();
    (this.stories as any) = null;
  }

  /**
   * Loads any glTF file into the scene using [Three.js loader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader).
   * @url The URL of the GLTF file to load
   */
  async load(url: string) {
    const loaded = (await this.loader.loadAsync(url)) as GLTF;
    const mesh = loaded.scene;
    const modelID = this.getModelID();
    this.GLTFModels[modelID] = mesh;
    this.context.getScene().add(mesh);
    return mesh;
  }

  /**
   * Load glTF and enable IFC.js tools over it.
   * This just works if the glTF was previously exported from an IFC model using `exportIfcAsGltf()`.
   * @url The URL of the GLTF file to load
   */
  async loadModel(url: string) {
    const gltfMesh = await this.getGltfMesh(url);
    gltfMesh.geometry.computeBoundsTree();
    gltfMesh.modelID = this.getModelID();
    this.context.getScene().add(gltfMesh);
    this.setupMeshAsModel(gltfMesh);
    return gltfMesh;
  }

  // TODO: Split up in smaller methods AND bring to new file
  /**
   * Exports the specified IFC file (or file subset) as glTF.
   * @fileURL The URL of the IFC file to convert to glTF
   * @ids (optional) The ids of the items to export. If not defined, the full model is exported
   */
  async exportIfcFileAsGltf(config: ExportConfig) {
    const {
      ifcFileUrl,
      getProperties,
      categories,
      splitByFloors,
      maxJSONSize,
      onProgress,
      coordinationMatrix
    } = config;

    const { loader, manager } = await this.setupIfcLoader(coordinationMatrix);

    const model = await loader.loadAsync(ifcFileUrl, (event) => {
      if (onProgress) onProgress(event.loaded, event.total, 'IFC');
    });

    const result: ExportResponse = {
      gltf: {},
      json: [],
      id: '',
      coordinationMatrix: []
    };

    const projects = await manager.getAllItemsOfType(model.modelID, IFCPROJECT, true);
    if (!projects.length) throw new Error('No IfcProject instances were found in the IFC.');
    const GUID = projects[0].GlobalId;
    if (!GUID) throw new Error('The found IfcProject does not have a GUID');
    result.id = GUID.value;

    result.coordinationMatrix = await manager.ifcAPI.GetCoordinationMatrix(0);

    let allIdsByFloor: IdsByFloorplan = {};
    let floorNames: string[] = [];
    if (splitByFloors) {
      allIdsByFloor = await this.getIDsByFloor(loader);
      floorNames = Object.keys(allIdsByFloor);
    }

    await this.getModels(
      categories,
      result,
      manager,
      splitByFloors,
      floorNames,
      allIdsByFloor,
      model,
      onProgress
    );

    if (getProperties) {
      await this.getProperties(model, maxJSONSize, onProgress, result);
    }

    await loader.ifcManager.dispose();
    this.tempIfcLoader = null;
    return result;
  }

  private async getProperties(
    model: any,
    maxJSONSize: number | undefined,
    onProgress: ((progress: number, total: number, process: string) => void) | undefined,
    result: ExportResponse
  ) {
    const previousLoader = this.IFC.properties.loader;
    this.IFC.properties.loader = this.tempIfcLoader!;

    const jsons = await this.IFC.properties.serializeAllProperties(
      model,
      maxJSONSize,
      (progress: number, total: number) => {
        if (onProgress) onProgress(progress, total, 'JSON');
      }
    );

    result.json = jsons.map((json) => new File([json], 'properties.json'));
    this.IFC.properties.loader = previousLoader;
  }

  private async getModels(
    categories: { [p: string]: number[] } | undefined,
    result: ExportResponse,
    manager: IFCManager,
    splitByFloors: boolean | undefined,
    floorNames: string[],
    allIdsByFloor: IdsByFloorplan,
    model: any,
    onProgress: ((progress: number, total: number, process: string) => void) | undefined
  ) {
    if (categories) {
      await this.getModelsByCategory(
        categories,
        result,
        manager,
        splitByFloors,
        floorNames,
        allIdsByFloor,
        model,
        onProgress
      );
    } else {
      await this.getModelsWithoutCategories(
        result,
        splitByFloors,
        floorNames,
        allIdsByFloor,
        model
      );
    }
  }

  private async setupIfcLoader(coordinationMatrix?: Matrix4) {
    const loader = new IFCLoader();
    this.tempIfcLoader = loader;
    const state = this.IFC.loader.ifcManager.state;
    const manager = loader.ifcManager;
    if (state.wasmPath) await manager.setWasmPath(state.wasmPath);
    if (state.worker.active) await manager.useWebWorkers(true, state.worker.path);
    if (state.webIfcSettings) await manager.applyWebIfcConfig(state.webIfcSettings);

    await manager.parser.setupOptionalCategories(
      this.IFC.loader.ifcManager.parser.optionalCategories
    );

    if (coordinationMatrix) {
      await this.overrideCoordMatrix(manager, coordinationMatrix);
    }

    return { loader, manager };
  }

  private async overrideCoordMatrix(manager: IFCManager, coordinationMatrix: Matrix4) {
    manager.setupCoordinationMatrix(coordinationMatrix);
  }

  private async getModelsByCategory(
    categories: { [p: string]: number[] },
    result: {
      gltf: { [p: string]: { [p: string]: { height: number; file: File | null } } };
      json: File[];
      id: string;
    },
    manager: IFCManager,
    splitByFloors: boolean | undefined,
    floorNames: string[],
    allIdsByFloor: IdsByFloorplan,
    model: any,
    onProgress: ((progress: number, total: number, process: string) => void) | undefined
  ) {
    const items: number[] = [];

    const categoryNames = Object.keys(categories);

    for (let i = 0; i < categoryNames.length; i++) {
      const categoryName = categoryNames[i];
      const currentCategories = categories[categoryName];
      if (!result.gltf[categoryName]) result.gltf[categoryName] = {};

      for (let j = 0; j < currentCategories.length; j++) {
        const foundItems = await manager.getAllItemsOfType(0, currentCategories[j], false);
        items.push(...foundItems);
      }

      const groupedIDs: { [floorName: string]: number[] } = {};
      if (splitByFloors) {
        floorNames.forEach((floorName) => {
          const floorIDs = allIdsByFloor[floorName];
          groupedIDs[floorName] = items.filter((id) => floorIDs.ids.has(id));
        });
      } else {
        groupedIDs[this.allFloors] = items;
      }

      const foundFloorNames = Object.keys(groupedIDs);
      for (let j = 0; j < foundFloorNames.length; j++) {
        const foundFloorName = foundFloorNames[j];
        const items = groupedIDs[foundFloorName];

        if (items.length) {
          const gltf = await this.exportModelPartToGltf(model, items, true);
          const height = allIdsByFloor[foundFloorName]?.height || 0;
          result.gltf[categoryName][foundFloorName] = {
            file: this.glTFToFile(gltf, 'model-part.gltf'),
            height
          };
        } else {
          result.gltf[categoryName][foundFloorName] = {
            file: null,
            height: 0
          };
        }
      }

      if (onProgress) onProgress(i, categoryNames?.length, 'GLTF');
      items.length = 0;
    }
  }

  private async getModelsWithoutCategories(
    result: {
      gltf: { [p: string]: { [p: string]: { height: number; file: File | null } } };
      json: File[];
      id: string;
    },
    splitByFloors: boolean | undefined,
    floorNames: string[],
    allIdsByFloor: IdsByFloorplan,
    model: any
  ) {
    result.gltf[this.allCategories] = {};
    if (splitByFloors) {
      for (let i = 0; i < floorNames.length; i++) {
        const floorName = floorNames[i];
        const floorIDs = Array.from(allIdsByFloor[floorName].ids);
        const gltf = await this.exportModelPartToGltf(model, floorIDs, true);
        result.gltf[this.allCategories][floorName] = {
          file: this.glTFToFile(gltf),
          height: allIdsByFloor[floorName].height
        };
      }
    } else {
      const gltf = await this.exportMeshToGltf(model);
      result.gltf[this.allCategories][this.allFloors] = {
        file: this.glTFToFile(gltf),
        height: 0
      };
    }
  }

  // TODO: Is this really necessary? Maybe with exporting the file is enough
  /**
   * Exports the specified model (or model subset) as glTF.
   * @modelID The ID of the IFC model to convert to glTF
   * @ids (optional) The ids of the items to export. If not defined, the full model is exported
   */
  async exportIfcAsGltf(modelID: number, ids?: number[]) {
    const model = this.context.items.ifcModels.find((model) => model.modelID === modelID);
    if (!model) throw new Error('The specified model does not exist!');
    return ids ? this.exportModelPartToGltf(model, ids) : this.exportMeshToGltf(model);
  }

  /**
   * Exports the given mesh as glTF.
   * @mesh The mesh to export.
   */
  exportMeshToGltf(mesh: Mesh) {
    return new Promise<any>((resolve) => {
      this.exporter.parse(mesh, (result: any) => resolve(result), this.options);
    });
  }

  // TODO: Split up in smaller methods AND bring to new file
  private exportModelPartToGltf(model: IFCModel, ids: number[], useTempLoader = false) {
    const coordinates: number[] = [];
    const expressIDs: number[] = [];
    const newIndices: number[] = [];

    const alreadySaved = new Map<number, number>();

    const customID = 'temp-gltf-subset';

    const loader = useTempLoader ? this.tempIfcLoader : this.IFC.loader;
    if (!loader) throw new Error('IFCLoader could not be found!');
    const subset = loader.ifcManager.createSubset({
      modelID: model.modelID,
      ids,
      removePrevious: true,
      customID
    });

    if (!subset.geometry.index) throw new Error('Geometry must be indexed!');

    const positionAttr = subset.geometry.attributes.position;
    const expressIDAttr = subset.geometry.attributes.expressID;

    const newGroups: any[] = subset.geometry.groups.filter((group) => group.count !== 0);
    const newMaterials: Material[] = [];
    const prevMaterials = subset.material as Material[];
    let newMaterialIndex = 0;
    newGroups.forEach((group) => {
      newMaterials.push(prevMaterials[group.materialIndex]);
      group.materialIndex = newMaterialIndex++;
    });

    let newIndex = 0;
    for (let i = 0; i < subset.geometry.index.count; i++) {
      const index = subset.geometry.index.array[i];

      if (!alreadySaved.has(index)) {
        coordinates.push(positionAttr.array[3 * index]);
        coordinates.push(positionAttr.array[3 * index + 1]);
        coordinates.push(positionAttr.array[3 * index + 2]);

        expressIDs.push(expressIDAttr.getX(index));
        alreadySaved.set(index, newIndex++);
      }

      const saved = alreadySaved.get(index) as number;
      newIndices.push(saved);
    }

    const geometryToExport = new BufferGeometry();
    const newVerticesAttr = new BufferAttribute(Float32Array.from(coordinates), 3);
    const newExpressIDAttr = new BufferAttribute(Uint32Array.from(expressIDs), 1);

    geometryToExport.setAttribute('position', newVerticesAttr);
    geometryToExport.setAttribute('expressID', newExpressIDAttr);
    geometryToExport.setIndex(newIndices);
    geometryToExport.groups = newGroups;
    geometryToExport.computeVertexNormals();

    loader.ifcManager.removeSubset(model.modelID, undefined, customID);
    const mesh = new Mesh(geometryToExport, newMaterials);

    return this.exportMeshToGltf(mesh);
  }

  private glTFToFile(gltf: any, name = 'model.gltf') {
    return new File([new Blob([gltf])], name);
  }

  private async getIDsByFloor(loader: IFCLoader) {
    const ifcProject = await loader.ifcManager.getSpatialStructure(0);

    const idsByFloor: IdsByFloorplan = {};

    const storeys = ifcProject.children[0].children[0].children as any[];
    const storeysIDs = storeys.map((storey: any) => storey.expressID);

    this.stories.loader = loader;
    const heightsByName = await this.stories.getAbsoluteElevation(0);
    const heights = Object.values(heightsByName);

    for (let i = 0; i < storeysIDs.length; i++) {
      const storey = storeys[i];
      const ids: number[] = [];
      this.getChildrenRecursively(storey, ids);

      const storeyID = storeysIDs[i];
      const properties = await loader.ifcManager.getItemProperties(0, storeyID);
      const name = this.getStoreyName(properties);
      const height = heights[i];

      idsByFloor[name] = {
        ids: new Set<number>(ids),
        height
      };
    }

    return idsByFloor;
  }

  private getStoreyName(storey: any) {
    if (storey.Name) return storey.Name.value;
    if (storey.LongName) return storey.LongName.value;
    return storey.GlobalId;
  }

  private getChildrenRecursively(spatialNode: any, result: number[]) {
    const ids = spatialNode.children.map((child: any) => child.expressID) as number[];
    result.push(...ids);
    spatialNode.children.forEach((child: any) => {
      if (child.children.length) {
        this.getChildrenRecursively(child, result);
      }
    });
  }

  private getModelID() {
    const models = this.context.items.ifcModels;
    if (!models.length) return 0;
    const allIDs = models.map((model) => model.modelID);
    return Math.max(...allIDs) + 1;
  }

  private async getGltfMesh(url: string) {
    const allMeshes = await this.getMeshes(url);
    const geometry = this.getGeometry(allMeshes);
    const materials = this.getMaterials(allMeshes);
    this.cleanUpLoadedInformation(allMeshes);
    return new Mesh(geometry, materials) as any as IFCModel;
  }

  // Necessary to make the glTF work as a model
  private setupMeshAsModel(newMesh: IFCModel) {
    // TODO: In the future we might want to rethink this or at least fix the typings
    this.IFC.loader.ifcManager.state.models[newMesh.modelID] = { mesh: newMesh } as any;
    const items = this.context.items;
    items.ifcModels.push(newMesh);
    items.pickableIfcModels.push(newMesh);
  }

  private cleanUpLoadedInformation(allMeshes: Mesh[]) {
    allMeshes.forEach((mesh) => {
      mesh.geometry.attributes = {};
      mesh.geometry.dispose();
      (mesh.material as MeshStandardMaterial).dispose();
    });
  }

  private getMaterials(allMeshes: Mesh[]) {
    const clippingPlanes = this.context.getClippingPlanes();
    return allMeshes.map((mesh) => {
      const material = mesh.material as MeshStandardMaterial;
      return new MeshLambertMaterial({
        color: material.color,
        transparent: material.opacity !== 1,
        opacity: material.opacity,
        side: 2,
        clippingPlanes
      });
    });
  }

  private async getMeshes(url: string) {
    const result = await this.load(url);
    result.removeFromParent();

    const isNested = result.children[0].children.length !== 0;
    const meshes = isNested ? result.children[0].children : [result.children[0]];
    return meshes as Mesh[];
  }

  private getGeometry(meshes: Mesh[]) {
    // eslint-disable-next-line no-underscore-dangle
    const parseDraco =
      meshes.length <= 1
        ? false
        : meshes[0].geometry.attributes.position.array !==
          meshes[1].geometry.attributes.position.array;
    const geometry = new BufferGeometry();
    if (parseDraco) {
      this.setupGeometryAttributesDraco(geometry, meshes);
      this.setupGeometryIndexDraco(meshes, geometry);
    } else {
      this.setupGeometryAttributes(geometry, meshes);
      this.setupGeometryIndex(meshes, geometry);
    }
    this.setupGroups(meshes, geometry);
    return geometry;
  }

  private setupGeometryAttributes(geometry: BufferGeometry, meshes: Mesh[]) {
    // eslint-disable-next-line no-underscore-dangle
    geometry.setAttribute('expressID', meshes[0].geometry.attributes._expressid);
    geometry.setAttribute('position', meshes[0].geometry.attributes.position);
    geometry.setAttribute('normal', meshes[0].geometry.attributes.normal);
  }

  private setupGeometryAttributesDraco(geometry: BufferGeometry, meshes: Mesh[]) {
    let intArraryLength = 0;
    let floatArrayLength = 0;
    for (let i = 0; i < meshes.length; i++) {
      const mesh = meshes[i];
      const attributes = mesh.geometry.attributes;
      // eslint-disable-next-line no-underscore-dangle
      intArraryLength += attributes._expressid.array.length;
      floatArrayLength += attributes.position.array.length;
    }

    const expressidArray = new Uint32Array(intArraryLength);
    const positionArray = new Float32Array(floatArrayLength);
    const normalArray = new Float32Array(floatArrayLength);

    this.fillArray(meshes, '_expressid', expressidArray);
    this.fillArray(meshes, 'position', positionArray);
    this.fillArray(meshes, 'normal', normalArray);

    geometry.setAttribute('expressID', new BufferAttribute(expressidArray, 1));
    geometry.setAttribute('position', new BufferAttribute(positionArray, 3));
    geometry.setAttribute('normal', new BufferAttribute(normalArray, 3));
  }

  private fillArray(meshes: Mesh[], key: string, arr: Uint32Array | Float32Array) {
    let offset = 0;
    for (let i = 0; i < meshes.length; i++) {
      const mesh = meshes[i];
      arr.set(mesh.geometry.attributes[key].array, offset);
      offset += mesh.geometry.attributes[key].array.length;
    }
  }

  private setupGeometryIndex(meshes: Mesh[], geometry: BufferGeometry) {
    const indices = meshes.map((mesh) => {
      const index = mesh.geometry.index;
      return index ? index.array : [];
    });

    const indexArray = [];
    for (let i = 0; i < indices.length; i++) {
      for (let j = 0; j < indices[i].length; j++) {
        indexArray.push(indices[i][j]);
      }
    }
    geometry.setIndex(indexArray);
  }

  private setupGeometryIndexDraco = (meshes: Mesh[], geometry: BufferGeometry) => {
    let off = 0;
    const offsets: number[] = [];
    for (let i = 0; i < meshes.length; i++) {
      offsets.push(off);
      // eslint-disable-next-line no-underscore-dangle
      off += meshes[i].geometry.attributes._expressid.count;
    }

    const indices = meshes.map((mesh, i) => {
      const index = mesh.geometry.index;
      return !index ? [] : new Uint32Array(index.array).map((value: number) => value + offsets[i]);
    });

    geometry.setIndex(this.flattenIndices(indices));
  };

  private flattenIndices = (indices: ArrayLike<number>[]) => {
    const indexArray = [];
    for (let i = 0; i < indices.length; i++) {
      for (let j = 0; j < indices[i].length; j++) {
        indexArray.push(indices[i][j]);
      }
    }
    return indexArray;
  };

  private setupGroups(meshes: Mesh[], geometry: BufferGeometry) {
    const groupLengths = meshes.map((mesh) => {
      const index = mesh.geometry.index;
      return index ? index.count : 0;
    });
    let start = 0;
    let materialIndex = 0;
    geometry.groups = groupLengths.map((count) => {
      const result = { start, count, materialIndex };
      materialIndex++;
      start += count;
      return result;
    });
  }
}
