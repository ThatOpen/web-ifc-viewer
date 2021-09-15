import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Box3, MathUtils, Mesh, MOUSE, PerspectiveCamera, Vector3 } from 'three';
import { Context, IfcComponent, MouseButtons, NavigationMode } from '../../../base-types';

export class OrbitControl extends IfcComponent implements NavigationMode {
  orbitControls: OrbitControls;
  enabled = true;
  private currentTarget = new Vector3();

  private startView = {
    target: new Vector3(),
    camera: new Vector3(20, 20, 20)
  };

  constructor(private context: Context, private camera: PerspectiveCamera) {
    super(context);
    this.orbitControls = new OrbitControls(this.camera, context.getDomElement());
    this.orbitControls.minDistance = 1;
    this.orbitControls.maxDistance = 500;

    this.orbitControls.addEventListener('change', () => {
      this.currentTarget.copy(this.orbitControls.target);
    });

    this.setupOrbitControls();
  }

  get target() {
    return this.orbitControls.target;
  }

  set minDistance(min: number) {
    this.orbitControls.minDistance = min;
  }

  set maxDistance(max: number) {
    this.orbitControls.maxDistance = max;
  }

  set homeView({ camera, target }: { camera: Vector3; target: Vector3 }) {
    this.startView.camera = camera;
    this.startView.target = target;
  }

  setOrbitControlsButtons(buttons: MouseButtons) {
    this.orbitControls.mouseButtons = {
      LEFT: buttons.left,
      MIDDLE: buttons.middle,
      RIGHT: buttons.right
    };
  }

  update(_delta: number) {
    if (this.enabled) {
      this.orbitControls.update();
    }
  }

  toggle(active: boolean) {
    if (active) {
      this.adjustTarget();
    }
    this.enabled = active;
    this.orbitControls.enabled = active;
  }

  targetItem = (mesh: Mesh, duration: number) => {
    const center = this.context.getCenter(mesh);
    const cameraEnd = new Vector3()
      .subVectors(this.camera.position, this.currentTarget)
      .add(center);
    this.context.getAnimator().move(this.camera.position, cameraEnd, duration);
    this.context.getAnimator().move(this.orbitControls.target, center, duration);
  };

  goToHomeView() {
    this.context.getAnimator().move(this.camera.position, this.startView.camera);
    this.context.getAnimator().move(this.orbitControls.target, this.startView.target);
  }

  fitModelToFrame() {
    if (!this.enabled) return;
    const { boxCenter, distance } = this.getBoxCenterAndDistance();
    const direction = new Vector3()
      .subVectors(this.camera.position, boxCenter)
      .multiply(new Vector3(1, 0, 1))
      .normalize();
    this.camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    this.camera.updateProjectionMatrix();
    this.orbitControls.target.set(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  private getBoxCenterAndDistance() {
    const scene = this.context.getScene();
    const box = new Box3().setFromObject(scene.children[scene.children.length - 1]);
    const boxSize = box.getSize(new Vector3()).length();
    const boxCenter = box.getCenter(new Vector3());

    const halfSizeToFitOnScreen = boxSize * 0.5;
    const halfFovY = MathUtils.degToRad(this.camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    return { boxCenter, distance };
  }

  private adjustTarget() {
    const cameraDir = new Vector3();
    this.camera.getWorldDirection(cameraDir);
    cameraDir.multiplyScalar(20);
    const center = new Vector3().addVectors(cameraDir, this.camera.position);
    this.orbitControls.target.set(center.x, center.y, center.z);
  }

  private setupOrbitControls() {
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor *= 2;
    this.orbitControls.target.set(0, 0, 0);
    const panWithMMB = this.context.options.panWithMMB || true;
    if (panWithMMB) {
      this.orbitControls.mouseButtons = {
        RIGHT: MOUSE.RIGHT,
        MIDDLE: MOUSE.RIGHT,
        LEFT: MOUSE.LEFT
      };
    }
  }
}
