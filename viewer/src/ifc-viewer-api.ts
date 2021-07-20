import { Color } from 'three';
import {
  IfcContext,
  IfcManager,
  ViewerOptions,
  IfcGrid,
  IfcAxes,
  IfcClipper,
  DropboxAPI,
  IfcStats
} from './components';

export class IfcViewerAPI {
  private readonly context: IfcContext;
  readonly IFC: IfcManager;
  clipper: IfcClipper;
  stats?: IfcStats;
  grid?: IfcGrid;
  axes?: IfcAxes;
  dropbox?: DropboxAPI;

  constructor(options: ViewerOptions) {
    if (!options.container) throw new Error('Could not get container element!');
    this.context = new IfcContext(options);
    this.IFC = new IfcManager(this.context);
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

  openDropboxWindow() {
    if (!this.dropbox) this.dropbox = new DropboxAPI(this.context, this.IFC);
    this.dropbox?.loadDropboxIfc();
  }
}
