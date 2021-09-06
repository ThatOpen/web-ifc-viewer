import { PerspectiveCamera, Vector3, MOUSE, Box3, MathUtils } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { IfcComponent, Context } from '../../base-types';

export class IfcCamera extends IfcComponent {
  camera: PerspectiveCamera;
  private controls: OrbitControls;
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

  dispose() {
    if (this.camera.parent) {
      this.camera.parent.remove(this.camera);
    }
    // @ts-ignore
    this.camera = null;
    this.controls.dispose();
    // @ts-ignore
    this.controls = null;
  }

  updateAspect() {
    const dims = this.context.getDimensions();
    this.camera.aspect = dims.x / dims.y;
    this.camera.updateProjectionMatrix();
  }

  toggleControls(active: boolean) {
    this.controls.enabled = active;
  }

  fitModelToFrame() {
    const scene = this.context.getScene();
    const box = new Box3().setFromObject(scene.children[scene.children.length - 1]);
    const boxSize = box.getSize(new Vector3()).length();
    const boxCenter = box.getCenter(new Vector3());

    const halfSizeToFitOnScreen = boxSize * 0.5;
    const halfFovY = MathUtils.degToRad(this.camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

    const direction = new Vector3()
      .subVectors(this.camera.position, boxCenter)
      .multiply(new Vector3(1, 0, 1))
      .normalize();

    this.camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);

    // set target to newest loaded model
    this.controls.target.copy(boxCenter);
    this.controls.update();
  }

  get target() {
    return this.controls.target;
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
