import { Clock, Color } from 'three';
import {
  Component,
  IfcCamera,
  IfcManager,
  IfcRaycaster,
  IfcRenderer,
  IfcScene,
  Items,
  ViewerOptions,
  IfcGrid,
  IfcAxes,
  IfcClipper,
  DropboxAPI,
  Edges
} from './components/index';

export class IfcViewerAPI {
  items: Items;
  ifcScene: IfcScene;
  ifcRenderer: IfcRenderer;
  container: HTMLElement;
  ifcCamera: IfcCamera;
  ifcCaster: IfcRaycaster;
  ifcManager: IfcManager;
  clock: Clock;
  grid?: IfcGrid;
  axes?: IfcAxes;
  clipper?: IfcClipper;
  dropbox?: DropboxAPI;
  edges?: Edges;

  constructor(options: ViewerOptions) {
    if (!options.container) throw new Error('Could not get container element!');
    this.container = options.container;
    this.items = this.newItems();
    this.ifcScene = new IfcScene(options);
    this.ifcRenderer = new IfcRenderer(options);
    this.ifcCamera = new IfcCamera(this.container, this.items, this.ifcRenderer.renderer);
    this.ifcCaster = new IfcRaycaster(this.items, this.ifcCamera.camera, this.ifcRenderer.renderer);
    this.ifcManager = new IfcManager(this.items, this.ifcScene.scene, this.ifcCaster, options);
    this.clock = new Clock(true);
    this.setupWindowRescale();
    this.render();
  }

  addComponent = (component: Component) => {
    this.items.components.push(component);
  };

  addGrid(size?: number, divisions?: number, colorCenterLine?: Color, colorGrid?: Color) {
    const scene = this.ifcScene.scene;
    this.grid = new IfcGrid(scene, size, divisions, colorCenterLine, colorGrid);
  }

  addAxes(size?: number) {
    const scene = this.ifcScene.scene;
    this.axes = new IfcAxes(scene, size);
  }

  addClippingPlane = () => {
    if (!this.clipper) this.clipper = new IfcClipper(this);
    this.clipper.createPlane();
  };

  removeClippingPlane = () => {
    if (!this.clipper) this.clipper = new IfcClipper(this);
    this.clipper.deletePlane();
  };

  toggleClippingPlanes = () => {
    if (!this.clipper) this.clipper = new IfcClipper(this);
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
    if (!this.dropbox) this.dropbox = new DropboxAPI(this.ifcManager);
    this.dropbox?.loadDropboxIfc();
  }

  private render = () => {
    requestAnimationFrame(this.render);
    this.updateAllComponents();
    this.ifcRenderer.renderer.render(this.ifcScene.scene, this.ifcCamera.camera);
  };

  private updateAllComponents() {
    const delta = this.clock.getDelta();
    this.items.components.forEach((component) => component.update(delta));
  }

  private setupWindowRescale() {
    window.addEventListener('resize', () => {
      this.ifcCamera.updateAspect();
      this.ifcRenderer.adjustRendererSize();
    });
  }

  private newItems(): Items {
    return {
      components: [],
      ifcModels: []
    };
  }
}
