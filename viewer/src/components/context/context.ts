import { Clock, Mesh, Object3D, Plane, Vector2, Vector3 } from 'three';
import { Context, IfcComponent, Items, NavigationModes, ViewerOptions } from '../../base-types';
import { IfcCamera } from './camera/camera';
import { IfcRaycaster } from './raycaster';
import { IfcRenderer } from './renderer/renderer';
import { IfcScene } from './scene';
import { Animator } from './animator';
import { IfcEvent, IfcEvents } from './ifcEvent';

export class IfcContext implements Context {
  options: ViewerOptions;
  items: Items;
  ifcCamera: IfcCamera;
  readonly scene: IfcScene;
  readonly renderer: IfcRenderer;
  readonly events: IfcEvents;
  private readonly clippingPlanes: Plane[];
  private readonly clock: Clock;
  private readonly ifcCaster: IfcRaycaster;
  private readonly ifcAnimator: Animator;

  constructor(options: ViewerOptions) {
    if (!options.container) throw new Error('Could not get container element!');
    this.options = options;
    this.events = new IfcEvents();
    this.items = this.newItems();
    this.scene = new IfcScene(this);
    this.renderer = new IfcRenderer(this);

    this.ifcCamera = new IfcCamera(this);
    this.events.publish(IfcEvent.onCameraReady);

    this.clippingPlanes = [];
    this.ifcCaster = new IfcRaycaster(this);
    this.clock = new Clock(true);
    this.ifcAnimator = new Animator();
    this.setupWindowRescale();
    this.render();
  }

  getScene() {
    return this.scene.scene;
  }

  getRenderer() {
    return this.renderer.basicRenderer;
  }

  getRenderer2D() {
    return this.renderer.renderer2D;
  }

  getCamera() {
    return this.ifcCamera.activeCamera;
  }

  getIfcCamera() {
    return this.ifcCamera;
  }

  getDomElement() {
    return this.getRenderer().domElement;
  }

  getDomElement2D() {
    return this.getRenderer2D().domElement;
  }

  getContainerElement() {
    return this.options.container;
  }

  getDimensions() {
    const element = this.getContainerElement();
    return new Vector2(element.clientWidth, element.clientHeight);
  }

  getClippingPlanes() {
    return this.clippingPlanes;
  }

  getAnimator() {
    return this.ifcAnimator;
  }

  getCenter(mesh: Mesh) {
    mesh.geometry.computeBoundingBox();
    if (!mesh.geometry.index) return new Vector3();
    const indices = mesh.geometry.index.array;
    const position = mesh.geometry.attributes.position;

    const threshold = 20;
    let xCoords = 0;
    let yCoords = 0;
    let zCoords = 0;
    let counter = 0;

    for (let i = 0; i < indices.length || i < threshold; i++) {
      xCoords += position.getX(indices[i]);
      yCoords += position.getY(indices[i]);
      zCoords += position.getZ(indices[i]);
      counter++;
    }

    return new Vector3(xCoords / counter, yCoords / counter, zCoords / counter);
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
    this.ifcCamera.navMode[NavigationModes.Orbit].fitModelToFrame();
  }

  toggleCameraControls(active: boolean) {
    this.ifcCamera.toggleCameraControls(active);
  }

  updateAspect() {
    this.ifcCamera.updateAspect();
    this.renderer.adjustRendererSize();
  }

  private render = () => {
    requestAnimationFrame(this.render);
    this.updateAllComponents();
  };

  private updateAllComponents() {
    const delta = this.clock.getDelta();
    this.items.components.forEach((component) => component.update(delta));
  }

  private setupWindowRescale() {
    window.addEventListener('resize', () => {
      this.updateAspect();
    });
  }

  private newItems(): Items {
    return {
      components: [],
      ifcModels: [],
      pickableIfcModels: []
    };
  }
}
