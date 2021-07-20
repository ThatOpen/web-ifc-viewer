// @ts-ignore
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { DoubleSide, Material, MeshLambertMaterial } from 'three';
import { IfcMesh, IfcModel } from 'web-ifc-three/IFC/BaseDefinitions';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { IfcComponent, Context } from '../../base-types';
import { IfcSelection } from './selection';
import { VisibilityManager } from './visibility-manager';

export class IfcManager extends IfcComponent {
  loader: IFCLoader;
  visibility: VisibilityManager;
  private preselection: IfcSelection;
  private selection: IfcSelection;
  private readonly context: Context;
  private readonly selectMat: Material | undefined;
  private readonly preselectMat: Material | undefined;
  private readonly defPreselectMat: Material;
  private readonly defSelectMat: Material;

  constructor(context: Context) {
    super(context);
    this.context = context;
    this.loader = new IFCLoader();
    this.setupThreeMeshBVH();
    this.visibility = new VisibilityManager(this.loader, this.context);
    this.defSelectMat = this.initializeDefMaterial(0xff33ff, 0.3);
    this.defPreselectMat = this.initializeDefMaterial(0xffccff, 0.5);
    this.selectMat = context.options.selectMaterial || this.defSelectMat;
    this.preselectMat = context.options.preselectMaterial || this.defPreselectMat;
    this.preselection = new IfcSelection(context, this.loader, this.preselectMat);
    this.selection = new IfcSelection(context, this.loader, this.selectMat);
  }

  async loadIfc(file: File, fitToFrame = false) {
    const url = URL.createObjectURL(file);
    await this.loadIfcUrl(url, fitToFrame);
  }

  async loadIfcUrl(url: string, fitToFrame = false) {
    try {
      const ifcModel = (await this.loader.loadAsync(url)) as IfcModel;
      this.addIfcModel(ifcModel.mesh);
      if (fitToFrame) this.context.fitToFrame();
    } catch (err) {
      console.error('Error loading IFC.');
      console.error(err);
    }
  }

  setWasmPath(path: string) {
    this.loader.ifcManager.setWasmPath(path);
  }

  getSpatialStructure(modelID: number) {
    return this.loader.ifcManager.getSpatialStructure(modelID);
  }

  getProperties(modelID: number, id: number, indirect: boolean) {
    if (modelID == null || id == null) return null;
    const props = this.loader.ifcManager.getItemProperties(modelID, id);
    if (indirect) {
      props.psets = this.loader.ifcManager.getPropertySets(modelID, id);
      props.type = this.loader.ifcManager.getTypeProperties(modelID, id);
    }
    console.log(props);
    return props;
  }

  getModelId() {
    const found = this.context.castRayIfc();
    if (!found) return null;
    const mesh = found.object as IfcMesh;
    if (!mesh || mesh.modelID === undefined || mesh.modelID === null) return null;
    return mesh.modelID;
  }

  getAllItemsOfType(modelID: number, type: number, verbose = true) {
    return this.loader.ifcManager.getAllItemsOfType(modelID, type, verbose);
  }

  prePickIfcItem = () => {
    const found = this.context.castRayIfc();
    if (!found) {
      this.preselection.removeSelectionOfOtherModel();
      return;
    }
    this.preselection.pick(found);
  };

  pickIfcItem = () => {
    const found = this.context.castRayIfc();
    if (!found) return null;
    const result = this.selection.pick(found);
    if (result == null || result.modelID == null || result.id == null) return null;
    return result;
  };

  pickIfcItemByID = (modelID: number, id: number) => {
    this.selection.pickByID(modelID, id);
  };

  private addIfcModel(ifcMesh: IfcMesh) {
    this.context.items.ifcModels.push(ifcMesh);
    this.context.items.pickableIfcModels.push(ifcMesh);
    this.context.getScene().add(ifcMesh);
  }

  private setupThreeMeshBVH() {
    this.loader.ifcManager.setupThreeMeshBVH(
      computeBoundsTree,
      disposeBoundsTree,
      acceleratedRaycast
    );
  }

  private initializeDefMaterial(color: number, opacity: number) {
    return new MeshLambertMaterial({
      color,
      opacity,
      transparent: true,
      depthTest: false,
      side: DoubleSide
    });
  }
}
