import { Clock, Mesh, Object3D, Plane, Vector2, Vector3 } from 'three';
import { IfcCamera } from './camera/camera';
import { IfcRaycaster } from './raycaster';
import { IfcRenderer } from './renderer/renderer';
import { IfcScene } from './scene';
import { Animator } from './animator';
import { IfcEvent, IfcEvents } from './ifcEvent';
import { IfcComponent, Items, NavigationModes, ViewerOptions } from '../../base-types';
import { IfcMouse } from './mouse';

export class IfcContext {
  options: ViewerOptions;
  items: Items;
  ifcCamera: IfcCamera;
  stats: any = null;
  mouse: IfcMouse;

  readonly scene: IfcScene;
  readonly renderer: IfcRenderer;
  readonly events: IfcEvents;
  private readonly clippingPlanes: Plane[];
  private readonly clock: Clock;
  private readonly ifcCaster: IfcRaycaster;
  private readonly ifcAnimator: Animator;

  private isThisBeingDisposed = false;

  constructor(options: ViewerOptions) {
    if (!options.container) throw new Error('Could not get container element!');
    this.options = options;
    this.events = new IfcEvents();
    this.items = this.newItems();
    this.scene = new IfcScene(this);
    this.renderer = new IfcRenderer(this);
    this.mouse = new IfcMouse(this.renderer.renderer.domElement);

    this.ifcCamera = new IfcCamera(this);
    this.events.publish(IfcEvent.onCameraReady);

    this.clippingPlanes = [];
    this.ifcCaster = new IfcRaycaster(this);
    this.clock = new Clock(true);
    this.ifcAnimator = new Animator();
    this.setupWindowRescale();
    this.render();
  }

  dispose() {
    this.isThisBeingDisposed = true;

    this.stats?.dom.remove();

    this.options.preselectMaterial?.dispose();
    this.options.selectMaterial?.dispose();
    (this.options as any) = null;

    this.items.components.length = 0;
    this.items.ifcModels.forEach((model) => {
      model.removeFromParent();
      if (model.geometry.boundsTree) model.geometry.disposeBoundsTree();
      model.geometry.dispose();
      if (Array.isArray(model.material)) model.material.forEach((mat) => mat.dispose());
      else model.material.dispose();
    });
    this.items.ifcModels.length = 0;
    this.items.pickableIfcModels.length = 0;
    (this.items as any) = null;

    this.ifcCamera.dispose();
    (this.ifcCamera as any) = null;
    this.scene.dispose();
    (this.scene as any) = null;
    this.renderer.dispose();
    (this.mouse as any) = null;
    (this.renderer as any) = null;
    this.events.dispose();
    (this.events as any) = null;
    this.ifcCaster.dispose();
    (this.ifcCaster as any) = null;
    this.ifcAnimator.dispose();
    (this.ifcAnimator as any) = null;

    (this.clock as any) = null;
    this.clippingPlanes.length = 0;
    this.unsetWindowRescale();
  }

  getScene() {
    return this.scene.scene;
  }

  getRenderer() {
    return this.renderer.renderer;
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

    return new Vector3(
      xCoords / counter + mesh.position.x,
      yCoords / counter + mesh.position.y,
      zCoords / counter + mesh.position.z
    );
  }

  // eslint-disable-next-line no-undef
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
    if (this.isThisBeingDisposed) return;
    if (this.stats) this.stats.begin();
    requestAnimationFrame(this.render);
    this.updateAllComponents();
    if (this.stats) this.stats.end();
  };

  private updateAllComponents() {
    const delta = this.clock.getDelta();
    this.items.components.forEach((component) => component.update(delta));
  }

  private setupWindowRescale() {
    window.addEventListener('resize', this.resize);
  }

  private unsetWindowRescale() {
    window.removeEventListener('resize', this.resize);
  }

  private resize = () => {
    this.updateAspect();
  };

  private newItems(): Items {
    return {
      components: [],
      ifcModels: [],
      pickableIfcModels: []
    };
  }
}
