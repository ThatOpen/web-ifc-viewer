import { Color } from 'three';
import { IfcContext } from './components/context';
import {
  IfcManager,
  ViewerOptions,
  IfcGrid,
  IfcAxes,
  IfcClipper,
  DropboxAPI
} from './components/index';

export class IfcViewerAPI {
  private readonly context: IfcContext;
  private readonly ifcManager: IfcManager;
  clipper: IfcClipper;
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

  loadIfc = async (file: File) => {
    this.ifcManager.loadIfc(file);
  };

  loadIfcUrl = async (fileUrl: string) => {
    this.ifcManager.loadIfcUrl(fileUrl);
  };

  setWasmPath(path: string) {
    this.ifcManager.setWasmPath(path);
  }

  selectIfcItem = (indirect = true, recursive = false) => {
    return this.ifcManager.pickIfcItem(indirect, recursive);
  };

  preselectIfcItem = () => {
    this.ifcManager.prePickIfcItem();
  };

  getSpatialStructure = (modelID: number) => {
    return this.ifcManager.getSpatialStructure(modelID);
  };

  openDropboxWindow() {
    if (!this.dropbox) this.dropbox = new DropboxAPI(this.context, this.ifcManager);
    this.dropbox?.loadDropboxIfc();
  }
}
