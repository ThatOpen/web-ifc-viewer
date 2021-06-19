import { PerspectiveCamera, Renderer, Vector2, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Component, Items } from '../../base-types';

export class IfcCamera extends Component {
  readonly camera: PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly renderer: Renderer;
  private readonly container: HTMLElement;

  constructor(container: HTMLElement, items: Items, renderer: Renderer) {
    super();
    this.renderer = renderer;
    this.container = container;

    const dims = this.getDimensions();
    this.camera = new PerspectiveCamera(45, dims.x / dims.y, 0.1, 1000);
    this.setupCamera();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.setupControls();
    items.components.push(this);
  }

  update() {
    this.controls.update();
  }

  updateAspect() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  toggleControls(active: boolean) {
    this.controls.enabled = active;
  }

  private getDimensions() {
    return new Vector2(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
  }

  private setupCamera() {
    // camera.up = new Vector3(0, 0, 1);
    this.camera.position.z = 8;
    this.camera.position.y = 8;
    this.camera.position.x = 8;
    this.camera.lookAt(new Vector3(0, 0, 0));
  }

  private setupControls() {
    this.controls.enableDamping = true;
    this.controls.dampingFactor *= 2;
  }
}
