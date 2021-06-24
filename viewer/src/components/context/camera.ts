import { PerspectiveCamera, Vector3, MOUSE } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { IfcComponent, Context } from '../../base-types';

export class IfcCamera extends IfcComponent {
  readonly camera: PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly context: Context;

  constructor(context: Context) {
    super(context);
    this.context = context;

    const dims = this.context.getDimensions();
    this.camera = new PerspectiveCamera(45, dims.x / dims.y, 0.1, 1000);
    this.setupCamera();

    this.controls = new OrbitControls(this.camera, context.getDomElement());
    this.setupControls();
  }

  update(_delta: number) {
    this.controls.update();
  }

  updateAspect() {
    const dims = this.context.getDimensions();
    this.camera.aspect = dims.x / dims.y;
    this.camera.updateProjectionMatrix();
  }

  toggleControls(active: boolean) {
    this.controls.enabled = active;
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
    const panWithMMB = this.context.options.panWithMMB || true;
    if (panWithMMB) {
      this.controls.mouseButtons = { RIGHT: MOUSE.RIGHT, MIDDLE: MOUSE.RIGHT, LEFT: MOUSE.LEFT };
    }
  }
}
