import { Color } from 'three';
import { IfcContext } from './components/context';
import {
  IfcManager,
  ViewerOptions,
  IfcGrid,
  IfcAxes,
  IfcClipper,
  DropboxAPI,
  IfcStats
} from './components/index';

export class IfcViewerAPI {
  private readonly context: IfcContext;
  private readonly ifcManager: IfcManager;
  clipper: IfcClipper;
  stats?: IfcStats;
  grid?: IfcGrid;
  axes?: IfcAxes;
  dropbox?: DropboxAPI;

  constructor(options: ViewerOptions) {
    if (!options.container) throw new Error('Could not get container element!');
    this.context = new IfcContext(options);
    this.ifcManager = new IfcManager(this.context);
    this.clipper = new IfcClipper(this.context);
  }

  addGrid(size?: number, divisions?: number, colorCenterLine?: Color, colorGrid?: Color) {
    this.grid = new IfcGrid(this.context, size, divisions, colorCenterLine, colorGrid);
  }

  addAxes(size?: number) {
    this.axes = new IfcAxes(this.context, size);
  }

  addStats(css = '') {
    this.stats = new IfcStats(this.context);
    this.stats.addStats(css);
  }

  getModelID() {
    return this.ifcManager.getModelId();
  }

  getProperties(modelID: number, id: number, indirect = false) {
    return this.ifcManager.getProperties(modelID, id, indirect);
  }

  getAllItemsOfType(modelID: number, type: number, verbose = true) {
    return this.ifcManager.getAllItemsOfType(modelID, type, verbose);
  }

  addClippingPlane = () => {
    this.clipper.createPlane();
  };

  removeClippingPlane = () => {
    this.clipper.deletePlane();
  };

  toggleClippingPlanes = () => {
    this.clipper.active = !this.clipper.active;
  };

  // toggleEdgesDisplay = () => {
  //   if(!this.edges) this.edges
  // }

  loadIfc = async (file: File, fitToFrame = false) => {
    await this.ifcManager.loadIfc(file);
    if (fitToFrame) this.context.fitToFrame();
  };

  loadIfcUrl = async (fileUrl: string, fitToFrame = false) => {
    await this.ifcManager.loadIfcUrl(fileUrl);
    if (fitToFrame) this.context.fitToFrame();
  };

  setWasmPath(path: string) {
    this.ifcManager.setWasmPath(path);
  }

  pickIfcItem = () => {
    return this.ifcManager.pickIfcItem();
  };

  prepickIfcItem = () => {
    this.ifcManager.prePickIfcItem();
  };

  pickIfcItemByID(modelID: number, id: number) {
    this.ifcManager.pickIfcItemByID(modelID, id);
  }

  getSpatialStructure = (modelID: number) => {
    return this.ifcManager.getSpatialStructure(modelID);
  };

  openDropboxWindow() {
    if (!this.dropbox) this.dropbox = new DropboxAPI(this.context, this.ifcManager);
    this.dropbox?.loadDropboxIfc();
  }
}
