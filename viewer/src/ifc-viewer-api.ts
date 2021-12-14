import { Color } from 'three';
import {
  IfcContext,
  IfcManager,
  ViewerOptions,
  IfcGrid,
  IfcAxes,
  IfcClipper,
  DropboxAPI,
  IfcStats,
  Edges,
  SectionFillManager,
  IfcDimensions,
  PlanManager
} from './components';
import { GLTFManager } from './components/import-export/glTF';
import { ShadowDropper } from './components/display/shadow-dropper';
import { DXFWriter } from './components/import-export/dxf';
import { PDFWriter } from './components/import-export/pdf';

export class IfcViewerAPI {
  public context: IfcContext;
  IFC: IfcManager;
  clipper: IfcClipper;
  plans: PlanManager;
  fills: SectionFillManager;
  dimensions: IfcDimensions;
  edges: Edges;
  shadowDropper: ShadowDropper;
  dxf: DXFWriter;
  pdf: PDFWriter;
  gltf: GLTFManager;
  stats?: IfcStats;
  grid?: IfcGrid;
  axes?: IfcAxes;
  dropbox?: DropboxAPI;

  constructor(options: ViewerOptions) {
    if (!options.container) throw new Error('Could not get container element!');
    this.context = new IfcContext(options);
    this.IFC = new IfcManager(this.context);
    this.clipper = new IfcClipper(this.context, this.IFC);
    this.plans = new PlanManager(this.IFC, this.context, this.clipper);
    this.fills = new SectionFillManager(this.IFC, this.context);
    this.dimensions = new IfcDimensions(this.context);
    this.edges = new Edges(this.context);
    this.shadowDropper = new ShadowDropper(this.context, this.IFC);
    this.dxf = new DXFWriter();
    this.pdf = new PDFWriter();
    this.gltf = new GLTFManager(this.context);
  }

  /**
   * Adds a base [grid](https://threejs.org/docs/#api/en/helpers/GridHelper) to the scene.
   * @size (optional) Size of the grid.
   * @divisions (optional) Number of divisions in X and Y.
   * @ColorCenterLine (optional) Color of the XY central lines of the grid.
   * @colorGrid (optional) Color of the XY lines of the grid.
   */
  addGrid(size?: number, divisions?: number, colorCenterLine?: Color, colorGrid?: Color) {
    this.grid = new IfcGrid(this.context, size, divisions, colorCenterLine, colorGrid);
  }

  /**
   * Adds base [axes](https://threejs.org/docs/#api/en/helpers/AxesHelper) to the scene.
   * @size (optional) Size of the axes.
   */
  addAxes(size?: number) {
    this.axes = new IfcAxes(this.context, size);
  }

  /**
   * Adds [stats](https://github.com/mrdoob/stats.js/) to the scene for testing purposes. For example:
   * ```js
   *     this.loader.addStats('position:fixed;top:6rem;right:0px;z-index:1;');
   * ```
   * @css The css text to control where to locate the stats.
   * @stats The stats.js API object
   */
  addStats(css = '', stats?: any) {
    // @ts-ignore
    this.stats = new IfcStats(this.context);
    this.stats?.initializeStats(stats);
    this.stats?.addStats(css);
  }

  /**
   * Adds a clipping plane on the face pointed to by the cursor.
   */
  addClippingPlane = () => {
    this.clipper.createPlane();
  };

  /**
   * Removes the clipping plane pointed by the cursor.
   */
  removeClippingPlane = () => {
    this.clipper.deletePlane();
  };

  /**
   * Turns on / off all clipping planes.
   */
  toggleClippingPlanes = () => {
    this.clipper.active = !this.clipper.active;
  };

  /**
   * Opens a dropbox window where the user can select their IFC models.
   */
  openDropboxWindow() {
    if (!this.dropbox) this.dropbox = new DropboxAPI(this.context, this.IFC);
    this.dropbox?.loadDropboxIfc();
  }

  /**
   * @deprecated Use `IfcViewerAPI.IFC.loadIfc()` instead.
   * Loads the given IFC in the current scene.
   * @file IFC as File.
   * @fitToFrame (optional) if true, brings the perspectiveCamera to the loaded IFC.
   */
  async loadIfc(file: File, fitToFrame = false) {
    await this.IFC.loadIfc(file, fitToFrame);
  }

  /**
   * @deprecated Use `IfcViewerAPI.IFC.loadIfcUrl()` instead.
   * Loads the given IFC in the current scene.
   * @file IFC as URL.
   * @fitToFrame (optional) if true, brings the perspectiveCamera to the loaded IFC.
   */
  async loadIfcUrl(url: string, fitToFrame = false) {
    await this.IFC.loadIfcUrl(url, fitToFrame);
  }

  /**
   * @deprecated Use `IfcViewerAPI.IFC.setWasmPath()` instead.
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
    this.IFC.setWasmPath(path);
  }

  /**
   * @deprecated Use `IfcViewerAPI.IFC.getSpatialStructure()` instead.
   * Gets the spatial structure of the specified model.
   * @modelID ID of the IFC model.
   */
  getSpatialStructure(modelID: number) {
    return this.IFC.getSpatialStructure(modelID);
  }

  /**
   * @deprecated Use `IfcViewerAPI.IFC.getProperties()` instead.
   * Gets the properties of the specified item.
   * @modelID ID of the IFC model.
   * @id Express ID of the item.
   * @indirect If true, also returns psets, qsets and type properties.
   */
  getProperties(modelID: number, id: number, indirect: boolean) {
    return this.IFC.getProperties(modelID, id, indirect);
  }

  /**
   * @deprecated Use `IfcViewerAPI.IFC.getModelID()` instead.
   * Gets the ID of the model pointed by the cursor.
   */
  getModelID() {
    return this.IFC.getModelID();
  }

  /**
   * @deprecated Use `IfcViewerAPI.IFC.getAllItemsOfType()` instead.
   * Gets all the items of the specified type in the specified IFC model.
   * @modelID ID of the IFC model.
   * @type type of element. You can import the type from web-ifc.
   * @verbose If true, also gets the properties for all the elements.
   */
  getAllItemsOfType(modelID: number, type: number, verbose = false) {
    return this.IFC.getAllItemsOfType(modelID, type, verbose);
  }

  /**
   * @deprecated Use `IfcViewerAPI.IFC.prePickIfcItem()` instead.
   * Highlights the item pointed by the cursor.
   */
  prePickIfcItem = () => {
    this.IFC.prePickIfcItem();
  };

  /**
   * @deprecated Use `IfcViewerAPI.IFC.pickIfcItem()` instead.
   * Highlights the item pointed by the cursor and gets is properties.
   */
  pickIfcItem = () => {
    return this.IFC.pickIfcItem();
  };

  /**
   * @deprecated Use `IfcViewerAPI.IFC.pickIfcItemsByID()` instead.
   * Highlights the item with the given ID.
   * @modelID ID of the IFC model.
   * @id Express ID of the item.
   */
  pickIfcItemsByID = (modelID: number, ids: number[]) => {
    this.IFC.pickIfcItemsByID(modelID, ids);
  };

  /**
   * TODO: Method to delete all data
   * Needs to be implemented yet
   */
  releaseAllMemory() {
  }
}
