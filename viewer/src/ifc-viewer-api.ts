import { Color } from 'three';
import {
  IfcContext,
  IfcManager,
  ViewerOptions,
  IfcGrid,
  IfcAxes,
  IfcClipper,
  DropboxAPI,
  Edges,
  SectionFillManager,
  IfcDimensions,
  PlanManager
} from './components';
import { GLTFManager } from './components/import-export/glTF';
import { ShadowDropper } from './components/display/shadow-dropper';
import { DXFWriter } from './components/import-export/dxf';
import { PDFWriter } from './components/import-export/pdf';
import { EdgeProjector } from './components/import-export/edges-vectorizer/edge-projection';
import { ClippingEdges } from './components/display/clipping-planes/clipping-edges';
import { SelectionWindow } from './components/selection/selection-window';

export class IfcViewerAPI {
  context: IfcContext;
  IFC: IfcManager;
  GLTF: GLTFManager;
  clipper: IfcClipper;
  plans: PlanManager;
  filler: SectionFillManager;
  dimensions: IfcDimensions;
  edges: Edges;
  shadowDropper: ShadowDropper;
  dxf: DXFWriter;
  pdf: PDFWriter;
  edgesProjector: EdgeProjector;
  grid: IfcGrid;
  axes: IfcAxes;
  dropbox: DropboxAPI;
  selectionWindow: SelectionWindow;

  constructor(options: ViewerOptions) {
    if (!options.container) throw new Error('Could not get container element!');
    this.context = new IfcContext(options);
    this.IFC = new IfcManager(this.context);
    this.grid = new IfcGrid(this.context);
    this.axes = new IfcAxes(this.context);
    this.clipper = new IfcClipper(this.context, this.IFC);
    this.plans = new PlanManager(this.IFC, this.context, this.clipper);
    this.filler = new SectionFillManager(this.IFC, this.context);
    this.dimensions = new IfcDimensions(this.context);
    this.edges = new Edges(this.context);
    this.shadowDropper = new ShadowDropper(this.context, this.IFC);
    this.edgesProjector = new EdgeProjector(this.context);
    this.dxf = new DXFWriter();
    this.pdf = new PDFWriter();
    this.GLTF = new GLTFManager(this.context, this.IFC);
    this.dropbox = new DropboxAPI(this.context, this.IFC);
    this.selectionWindow = new SelectionWindow(this.context);
    ClippingEdges.ifc = this.IFC;
    ClippingEdges.context = this.context;
  }

  /**
   * @deprecated Use `IfcViewerAPI.clipper.createPlane()` instead.
   * Adds a clipping plane on the face pointed to by the cursor.
   */
  addClippingPlane = () => {
    this.clipper.createPlane();
  };

  /**
   * @deprecated Use `IfcViewerAPI.clipper.deletePlane()` instead.
   * Removes the clipping plane pointed by the cursor.
   */
  removeClippingPlane = () => {
    this.clipper.deletePlane();
  };

  /**
   * @deprecated Use `IfcViewerAPI.clipper.toggle()` instead.
   * Turns on / off all clipping planes.
   */
  toggleClippingPlanes = () => {
    this.clipper.toggle();
  };

  /**
   * @deprecated Use `this.dropbox.loadDropboxIfc()` instead.
   * Opens a dropbox window where the user can select their IFC models.
   */
  openDropboxWindow() {
    this.dropbox.loadDropboxIfc();
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
   * @deprecated Use `IfcViewerAPI.grid.setGrid()` instead.
   * Adds a base [grid](https://threejs.org/docs/#api/en/helpers/GridHelper) to the scene.
   * @size (optional) Size of the grid.
   * @divisions (optional) Number of divisions in X and Y.
   * @ColorCenterLine (optional) Color of the XY central lines of the grid.
   * @colorGrid (optional) Color of the XY lines of the grid.
   */
  addGrid(size?: number, divisions?: number, colorCenterLine?: Color, colorGrid?: Color) {
    this.grid.setGrid(size, divisions, colorCenterLine, colorGrid);
  }

  /**
   * @deprecated Use `IfcViewerAPI.axes.setAxes()` instead.
   * Adds base [axes](https://threejs.org/docs/#api/en/helpers/AxesHelper) to the scene.
   * @size (optional) Size of the axes.
   */
  addAxes(size?: number) {
    this.axes.setAxes(size);
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
   * @deprecated Use `IfcViewerAPI.IFC.selector.prePickIfcItem()` instead.
   * Highlights the item pointed by the cursor.
   */
  prePickIfcItem = () => {
    this.IFC.selector.prePickIfcItem();
  };

  /**
   * @deprecated Use `IfcViewerAPI.IFC.selector.pickIfcItem()` instead.
   * Highlights the item pointed by the cursor and gets is properties.
   */
  pickIfcItem = () => {
    return this.IFC.selector.pickIfcItem();
  };

  /**
   * @deprecated Use `IfcViewerAPI.IFC.selector.pickIfcItemsByID()` instead.
   * Highlights the item with the given ID.
   * @modelID ID of the IFC model.
   * @id Express ID of the item.
   */
  pickIfcItemsByID = (modelID: number, ids: number[]) => {
    this.IFC.selector.pickIfcItemsByID(modelID, ids);
  };

  /**
   * Releases all the memory allocated by IFC.js.
   * Use this only when deleting the ifcViewerAPI instance.
   * This is especially important when using libraries and frameworks that handle the lifecycle
   * of objects automatically (e.g. React, Angular, etc). If you are using one of these and are
   * instantiating webIfcViewer inside a component, make sure you use this method in the component
   * destruction event.
   */
  async dispose() {
    this.grid.dispose();
    (this.grid as any) = null;
    this.axes.dispose();
    (this.axes as any) = null;
    this.context.dispose();
    (this.context as any) = null;
    this.clipper.dispose();
    (this.clipper as any) = null;
    this.plans.dispose();
    (this.plans as any) = null;
    this.filler.dispose();
    (this.filler as any) = null;
    this.dimensions.dispose();
    (this.dimensions as any) = null;
    this.edges.dispose();
    (this.edges as any) = null;
    this.shadowDropper.dispose();
    (this.shadowDropper as any) = null;
    this.dxf.dispose();
    (this.dxf as any) = null;
    this.pdf.dispose();
    (this.pdf as any) = null;
    this.edgesProjector.dispose();
    (this.edgesProjector as any) = null;
    (this.dropbox as any) = null;
    this.GLTF.dispose();
    (this.GLTF as any) = null;
    await this.IFC.dispose();
    (this.IFC as any) = null;
  }
}
