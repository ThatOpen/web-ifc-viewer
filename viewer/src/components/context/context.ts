import { Clock, Object3D, Plane, Vector2 } from 'three';
import { Context } from 'vm';
import { IfcComponent, Items, ViewerOptions } from '../../base-types';
import { IfcCamera } from './camera';
import { IfcRaycaster } from './raycaster';
import { IfcRenderer } from './renderer';
import { IfcScene } from './scene';

export class IfcContext implements Context {
  options: ViewerOptions;
  items: Items;

  private readonly ifcScene: IfcScene;
  private readonly ifcRenderer: IfcRenderer;
  private readonly ifcCamera: IfcCamera;
  private readonly clippingPlanes: Plane[];
  private readonly clock: Clock;
  private readonly ifcCaster: IfcRaycaster;

  constructor(options: ViewerOptions) {
    if (!options.container) throw new Error('Could not get container element!');
    this.options = options;
    this.items = this.newItems();
    this.ifcScene = new IfcScene(this);
    this.ifcRenderer = new IfcRenderer(this);
    this.ifcCamera = new IfcCamera(this);
    this.clippingPlanes = [];
    this.ifcCaster = new IfcRaycaster(this);
    this.clock = new Clock(true);
    this.setupWindowRescale();
    const isWebXR = this.options.webXR || false;
    if (isWebXR) {
      this.renderForWebXR();
    } else {
      this.render();
    }
  }

  getScene() {
    return this.ifcScene.scene;
  }

  getRenderer() {
    return this.ifcRenderer.renderer;
  }

  getCamera() {
    return this.ifcCamera.camera;
  }

  toggleCameraControls(active: boolean) {
    this.ifcCamera.toggleControls(active);
  }

  getDomElement() {
    return this.getRenderer().domElement;
  }

  getDimensions() {
    const element = this.getDomElement();
    return new Vector2(element.clientWidth, element.clientHeight);
  }

  getClippingPlanes() {
    return this.clippingPlanes;
  }

  addComponent(component: IfcComponent) {
    this.items.components.push(component);
  }

  addClippingPlane(plane: Plane) {
    this.clippingPlanes.push(plane);
  }

  removeClippingPlane(plane: Plane) {
    const index = this.clippingPlanes.indexOf(plane);
    this.clippingPlanes.splice(index, 1);
  }

  castRay(items: Object3D[]) {
    return this.ifcCaster.castRay(items);
  }

  castRayIfc() {
    return this.ifcCaster.castRayIfc();
  }

  fitToFrame() {
    this.ifcCamera.fitModelToFrame();
  }

  private render = () => {
    requestAnimationFrame(this.render);
    this.updateAllComponents();
  };

  private renderForWebXR = () => {
    const newAnimationLoop = () => {
      this.getRenderer().render(this.getScene(), this.getCamera());
    };
    this.getRenderer().setAnimationLoop(newAnimationLoop);
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
