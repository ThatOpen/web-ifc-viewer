// @ts-ignore
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { DoubleSide, Material, MeshLambertMaterial } from 'three';
import { IfcMesh, IfcModel } from 'web-ifc-three/IFC/BaseDefinitions';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { LoaderSettings } from 'web-ifc';
import { IfcComponent, Context } from '../../base-types';
import { IfcSelection } from './selection';
import { VisibilityManager } from './visibility-manager';

export class IfcManager extends IfcComponent {
  loader: IFCLoader;
  visibility: VisibilityManager;
  preselection: IfcSelection;
  selection: IfcSelection;
  highlight: IfcSelection;
  private readonly context: Context;
  private readonly selectMat: Material | undefined;
  readonly preselectMat: Material | undefined;
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
    this.highlight = new IfcSelection(context, this.loader);
  }

  /**
   * Loads the given IFC in the current scene.
   * @file IFC as File.
   * @fitToFrame (optional) if true, brings the perspectiveCamera to the loaded IFC.
   * @onError (optional) a callback function to report on loading errors
   */
  async loadIfc(file: File, fitToFrame = false, onError?: (err: any) => any) {
    const url = URL.createObjectURL(file);
    return this.loadIfcUrl(url, fitToFrame, undefined, onError);
  }

  /**
   * Loads the given IFC in the current scene.
   * @file IFC as URL.
   * @fitToFrame (optional) if true, brings the perspectiveCamera to the loaded IFC.
   * @onProgress (optional) a callback function to report on downloading progress
   * @onError (optional) a callback function to report on loading errors
   */
  async loadIfcUrl(
    url: string,
    fitToFrame = false,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (err: any) => any
  ) {
    try {
      const ifcModel = (await this.loader.loadAsync(url, onProgress)) as IfcModel;
      this.addIfcModel(ifcModel.mesh);
      if (fitToFrame) this.context.fitToFrame();
      return ifcModel;
    } catch (err) {
      console.error('Error loading IFC.');
      console.error(err);
      if (onError) onError(err);
      return null;
    }
  }

  /**
   * Sets the relative path of web-ifc.wasm file in the project.
   * Beware: you **must** serve this file in your page; this means
   * that you have to copy this files from *node_modules/web-ifc*
   * to your deployment directory.
   *
   * If you don't use this methods,
   * IFC.js assumes that you are serving it in the root directory.
   *
   * Example if web-ifc.wasm is in dist/wasmDir:
   * `ifcLoader.setWasmPath("dist/wasmDir/");`
   *
   * @path Relative path to web-ifc.wasm.
   */
  setWasmPath(path: string) {
    this.loader.ifcManager.setWasmPath(path);
  }

  /**
   * Applies a configuration for [web-ifc](https://ifcjs.github.io/info/docs/Guide/web-ifc/Introduction).
   */
  applyWebIfcConfig(settings: LoaderSettings) {
    this.loader.ifcManager.applyWebIfcConfig(settings);
  }

  /**
   * Gets the spatial structure of the specified model.
   * @modelID ID of the IFC model.
   */
  getSpatialStructure(modelID: number, includeProperties?: boolean) {
    return this.loader.ifcManager.getSpatialStructure(modelID, includeProperties);
  }

  /**
   * Gets the properties of the specified item.
   * @modelID ID of the IFC model.
   * @id Express ID of the item.
   * @indirect If true, also returns psets, qsets and type properties.
   * @recursive If true, this gets the native properties of the referenced elements recursively.
   */
  async getProperties(modelID: number, id: number, indirect: boolean, recursive?: boolean) {
    if (modelID == null || id == null) return null;
    const props = await this.loader.ifcManager.getItemProperties(modelID, id, recursive);
    if (indirect) {
      props.psets = await this.loader.ifcManager.getPropertySets(modelID, id, recursive);
      props.mats = await this.loader.ifcManager.getMaterialsProperties(modelID, id, recursive);
      props.type = await this.loader.ifcManager.getTypeProperties(modelID, id, recursive);
    }
    return props;
  }

  /**
   * Gets the ID of the model pointed by the cursor.
   */
  getModelID() {
    const found = this.context.castRayIfc();
    if (!found) return null;
    const mesh = found.object as IfcMesh;
    if (!mesh || mesh.modelID === undefined || mesh.modelID === null) return null;
    return mesh.modelID;
  }

  /**
   * Gets all the items of the specified type in the specified IFC model.
   * @modelID ID of the IFC model.
   * @type type of element. You can import the type from web-ifc.
   * @verbose If true, also gets the properties for all the elements.
   */
  getAllItemsOfType(modelID: number, type: number, verbose = false) {
    return this.loader.ifcManager.getAllItemsOfType(modelID, type, verbose);
  }

  /**
   * Highlights the item pointed by the cursor.
   */
  prePickIfcItem = () => {
    const found = this.context.castRayIfc();
    if (!found) {
      this.preselection.removeSelectionOfOtherModel();
      return;
    }
    this.preselection.pick(found);
  };

  /**
   * Highlights the item pointed by the cursor and gets is properties.
   * @focusSelection If true, animate the perspectiveCamera to focus the current selection
   */
  pickIfcItem = async (focusSelection = false) => {
    const found = this.context.castRayIfc();
    if (!found) return null;
    const result = await this.selection.pick(found, focusSelection);
    if (result == null || result.modelID == null || result.id == null) return null;
    return result;
  };

  /**
   * Highlights the item pointed by the cursor and gets is properties, without applying any material to it.
   * @focusSelection If true, animate the perspectiveCamera to focus the current selection
   */
  highlightIfcItem = async (focusSelection = false) => {
    const found = this.context.castRayIfc();
    if (!found) return null;
    const result = await this.highlight.pick(found, focusSelection);
    if (result == null || result.modelID == null || result.id == null) return null;
    return result;
  };

  /**
   * Highlights the item with the given ID.
   * @modelID ID of the IFC model.
   * @id Express ID of the item.
   */
  pickIfcItemsByID = (
    modelID: number,
    ids: number[],
    focusSelection = false
  ) => {
    this.selection.pickByID(modelID, ids, focusSelection);
  };

  prepickIfcItemsByID = (
    modelID: number,
    ids: number[],
    focusSelection = false
  ) => {
    this.preselection.pickByID(modelID, ids, focusSelection);
  };

  highlightIfcItemsByID = (
    modelID: number,
    ids: number[],
    focusSelection = false
  ) => {
    this.highlight.pickByID(modelID, ids, focusSelection);
  };

  unpickIfcItems = () => {
    this.selection.unpick();
  };

  unPrepickIfcItems = () => {
    this.preselection.unpick();
  };

  unHighlightIfcItems = () => {
    this.highlight.unpick();
  };

  /**
   * Hides the selected items in the specified model
   * @modelID ID of the IFC model.
   * @ids Express ID of the elements.
   */
  hideItems(modelID: number, ids: number[]) {
    this.loader.ifcManager.hideItems(modelID, ids);
  }

  /**
   * Hides all the items of the specified model
   * @modelID ID of the IFC model.
   */
  hideAllItems(modelID: number) {
    this.loader.ifcManager.hideAllItems(modelID);
  }

  /**
   * Shows all the items of the specified model
   * @modelID ID of the IFC model.
   * @ids Express ID of the elements.
   */
  showItems(modelID: number, ids: number[]) {
    this.loader.ifcManager.showItems(modelID, ids);
  }

  /**
   * Shows all the items of the specified model
   * @modelID ID of the IFC model.
   */
  showAllItems(modelID: number) {
    this.loader.ifcManager.showAllItems(modelID);
  }

  // TODO: Move to another file, cleanup
  newMats: { [modelID: number]: Material[] } = {};

  /**
   * Makes an IFC model translucent
   * @modelID ID of the IFC model.
   * @translucent wether to activate or deactivate the translucency.
   * @opacity the opacity of the translucent material.
   * @selectable wether the translucent models are selectable with the mouse.
   */
  setModelTranslucency(modelID: number, translucent: boolean, opacity = 0.2, selectable = false) {
    const model = this.context.items.ifcModels.find((model) => model.modelID === modelID);
    if (!model) return;
    if (Array.isArray(model.material)) {
      model.material.forEach((material) => {
        if (material.userData.opacity === undefined) {
          material.userData = { transparent: material.transparent, opacity: material.opacity };
        }
      });
      if (!this.newMats[modelID]) this.newMats[modelID] = model.material.map((mat) => mat.clone());
      const newMats = this.newMats[modelID];
      newMats.forEach((mat) => {
        mat.opacity = translucent ? opacity : mat.userData.opacity;
        mat.transparent = translucent ? true : mat.userData.transparent;
      });
      model.material = newMats;
    }
    if (translucent && !selectable) {
      const index = this.context.items.pickableIfcModels.indexOf(model);
      this.context.items.pickableIfcModels.splice(index, 1);
    } else if (!this.context.items.pickableIfcModels.includes(model)) {
      this.context.items.pickableIfcModels.push(model);
    }
  }

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
    const planes = this.context.getClippingPlanes();
    return new MeshLambertMaterial({
      color,
      opacity,
      transparent: true,
      depthTest: false,
      side: DoubleSide,
      clippingPlanes: planes
    });
  }
}
