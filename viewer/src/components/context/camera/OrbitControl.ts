import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  Box3,
  Camera,
  MathUtils,
  Mesh,
  MOUSE,
  OrthographicCamera,
  PerspectiveCamera,
  Vector3
} from 'three';
import {
  Context,
  IfcComponent,
  MouseButtons,
  NavigationMode,
  NavigationModes
} from '../../../base-types';

export class OrbitControl extends IfcComponent implements NavigationMode {
  orbitControls: OrbitControls;
  enabled = true;
  private currentTarget = new Vector3();
  readonly mode = NavigationModes.Orbit;

  private onCameraChangeCallbacks: Function[] = [];

  private startView = {
    target: new Vector3(),
    camera: new Vector3(20, 20, 20)
  };

  constructor(
    private context: Context,
    private perspectiveCamera: PerspectiveCamera,
    private orthographicCamera: OrthographicCamera
  ) {
    super(context);

    orthographicCamera.position.z = 500;

    this.orbitControls = new OrbitControls(this.orthographicCamera, context.getDomElement());
    // this.orbitControls.minDistance = 1;
    // this.orbitControls.maxDistance = 500;
    // this.orbitControls.minZoom = 1;
    // this.orbitControls.maxZoom = 500;

    this.orbitControls.addEventListener('change', () => {
      this.currentTarget.copy(this.orbitControls.target);
    });

    this.setupOrbitControls();
    window.onkeypress = (e) => {
      if (e.code === 'Enter') {
        console.log('Switch');
        this.togglePerspective();
      }
    };
  }

  get activeCamera() {
    return this.orbitControls.object;
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

  submitOnChange(action: (event: any) => void) {
    this.orbitControls.addEventListener('change', (event: any) => {
      action(event);
    });
  }

  submitOnCameraChange(action: (camera: Camera) => any) {
    this.onCameraChangeCallbacks.push(action);
  }

  submitOnUnlock(_action: (event: any) => void) {}

  togglePerspective() {
    if (this.activeCamera === this.perspectiveCamera) {
      // Matching orthographic camera to perspective camera
      // Resource: https://stackoverflow.com/questions/48758959/what-is-required-to-convert-threejs-perspective-camera-to-orthographic

      const lineOfSight = new Vector3();
      this.perspectiveCamera.getWorldDirection(lineOfSight);

      const distance = this.target.clone().sub(this.perspectiveCamera.position);
      const depth = distance.dot(lineOfSight);

      const dims = this.context.getDimensions();
      const aspect = dims.x / dims.y;
      const height = depth * 2 * Math.atan((this.perspectiveCamera.fov * (Math.PI / 180)) / 2);
      const width = height * aspect;

      this.orthographicCamera.left = width / -2;
      this.orthographicCamera.right = width / 2;
      this.orthographicCamera.top = height / 2;
      this.orthographicCamera.bottom = height / -2;

      this.orthographicCamera.position.copy(this.perspectiveCamera.position);
      this.orthographicCamera.quaternion.copy(this.perspectiveCamera.quaternion);
      this.orbitControls.object = this.orthographicCamera;
    } else {
      this.perspectiveCamera.position.copy(this.orthographicCamera.position);
      this.perspectiveCamera.quaternion.copy(this.orthographicCamera.quaternion);
      this.orbitControls.object = this.perspectiveCamera;
    }

    this.onCameraChangeCallbacks.forEach((c) => c(this.activeCamera));
  }

  toggle(active: boolean) {
    if (active) {
      // this.adjustTarget();
    }
    this.enabled = active;
    this.orbitControls.enabled = active;
  }

  targetItem = (mesh: Mesh, duration: number) => {
    const center = this.context.getCenter(mesh);
    const cameraEnd = new Vector3()
      .subVectors(this.perspectiveCamera.position, this.currentTarget)
      .add(center);
    this.context.getAnimator().move(this.perspectiveCamera.position, cameraEnd, duration);
    this.context.getAnimator().move(this.orbitControls.target, center, duration);
  };

  goToHomeView() {
    this.context.getAnimator().move(this.perspectiveCamera.position, this.startView.camera);
    this.context.getAnimator().move(this.orbitControls.target, this.startView.target);
  }

  fitModelToFrame() {
    if (!this.enabled) return;
    const { boxCenter, distance } = this.getBoxCenterAndDistance();
    const direction = new Vector3()
      .subVectors(this.perspectiveCamera.position, boxCenter)
      .multiply(new Vector3(1, 0, 1))
      .normalize();
    this.perspectiveCamera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    this.perspectiveCamera.updateProjectionMatrix();
    this.orbitControls.target.set(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  private getBoxCenterAndDistance() {
    const scene = this.context.getScene();
    const box = new Box3().setFromObject(scene.children[scene.children.length - 1]);
    const boxSize = box.getSize(new Vector3()).length();
    const boxCenter = box.getCenter(new Vector3());

    const halfSizeToFitOnScreen = boxSize * 0.5;
    const halfFovY = MathUtils.degToRad(this.perspectiveCamera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    return { boxCenter, distance };
  }

  private adjustTarget() {
    const cameraDir = new Vector3();
    this.perspectiveCamera.getWorldDirection(cameraDir);
    cameraDir.multiplyScalar(20);
    const center = new Vector3().addVectors(cameraDir, this.perspectiveCamera.position);
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
