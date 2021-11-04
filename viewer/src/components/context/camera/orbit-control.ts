// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  Box3,
  Camera,
  MathUtils,
  Matrix4,
  Mesh,
  MOUSE,
  OrthographicCamera,
  PerspectiveCamera,
  Quaternion,
  Raycaster,
  Sphere,
  Spherical,
  Vector2,
  Vector3,
  Vector4
} from 'three';
import CameraControls from 'camera-controls';
import {
  CameraProjections,
  Context,
  IfcComponent,
  MouseButtons,
  NavigationMode,
  NavigationModes
} from '../../../base-types';
import { LiteEvent } from '../../../utils/LiteEvent';

const subsetOfTHREE = {
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils: {
    DEG2RAD: MathUtils.DEG2RAD,
    clamp: MathUtils.clamp
  }
};

export class OrbitControl extends IfcComponent implements NavigationMode {
  enabled = true;
  currentCamera: Camera;

  readonly cameraControls: CameraControls;
  readonly mode = NavigationModes.Orbit;
  readonly onChange = new LiteEvent();
  readonly onUnlock = new LiteEvent();
  readonly onChangeProjection = new LiteEvent<Camera>();
  private currentTarget = new Vector3();

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

    CameraControls.install({ THREE: subsetOfTHREE });

    this.currentCamera = this.perspectiveCamera;
    this.cameraControls = new CameraControls(perspectiveCamera, context.getDomElement());

    // this.orbitControls = new OrbitControls(this.perspectiveCamera, context.getDomElement());
    // this.orbitControls.minDistance = 1;
    // this.orbitControls.maxDistance = 500;
    // this.orbitControls.minZoom = 1;
    // this.orbitControls.maxZoom = 500;

    // this.orbitControls.addEventListener('change', (event) => {
    //   this.currentTarget.copy(this.orbitControls.target);
    //   this.onChange.trigger(event);
    // });

    this.setupOrbitControls();
  }

  // get panningOnly() {
  //   return !this.orbitControls.enableRotate;
  // }
  //
  // set panningOnly(active: boolean) {
  //   this.orbitControls.enableRotate = !active;
  // }

  get activeCamera() {
    // return this.orbitControls.object;
    return this.cameraControls.camera;
  }

  get target() {
    const target = new Vector3();
    this.cameraControls.getTarget(target);
    return target;
  }

  set minDistance(min: number) {
    this.cameraControls.minDistance = min;
  }

  set maxDistance(max: number) {
    this.cameraControls.maxDistance = max;
  }

  set homeView({ camera, target }: { camera: Vector3; target: Vector3 }) {
    this.startView.camera = camera;
    this.startView.target = target;
  }

  get projection() {
    return this.activeCamera === this.perspectiveCamera
      ? CameraProjections.Perspective
      : CameraProjections.Orthographic;
  }

  set projection(projection: CameraProjections) {
    if (this.projection === projection) return;

    if (projection === CameraProjections.Orthographic) {
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

      this.orthographicCamera.zoom = 1;
      this.orthographicCamera.left = width / -2;
      this.orthographicCamera.right = width / 2;
      this.orthographicCamera.top = height / 2;
      this.orthographicCamera.bottom = height / -2;
      this.orthographicCamera.updateProjectionMatrix();

      this.orthographicCamera.position.copy(this.perspectiveCamera.position);
      this.orthographicCamera.quaternion.copy(this.perspectiveCamera.quaternion);

      this.cameraControls.camera = this.orthographicCamera;
      this.cameraControls.mouseButtons.wheel = CameraControls.ACTION.ZOOM;

      this.currentCamera = this.orthographicCamera;
    } else {
      this.perspectiveCamera.position.copy(this.orthographicCamera.position);
      this.perspectiveCamera.quaternion.copy(this.orthographicCamera.quaternion);
      this.perspectiveCamera.updateProjectionMatrix();

      this.cameraControls.camera = this.perspectiveCamera;
      this.cameraControls.mouseButtons.wheel = CameraControls.ACTION.DOLLY;

      this.currentCamera = this.perspectiveCamera;
    }
  }

  setOrbitControlsButtons(_buttons: MouseButtons) {
    // this.orbitControls.mouseButtons = {
    //   LEFT: buttons.left,
    //   MIDDLE: buttons.middle,
    //   RIGHT: buttons.right
    // };
  }

  update(_delta: number) {
    // if (this.enabled) {
    //   this.orbitControls.update();
    // }
    this.cameraControls.update(_delta);
  }

  /**
   * @deprecated Use onChange.on() instead.
   */
  submitOnChange(action: (event: any) => void) {
    this.onChange.on(action);
  }

  /**
   * @deprecated Use onChange.on() instead.
   */
  submitOnUnlock(action: (event: any) => void) {
    this.onUnlock.on(action);
  }

  toggleProjection() {
    if (this.activeCamera === this.perspectiveCamera) {
      this.projection = CameraProjections.Orthographic;
    } else {
      this.projection = CameraProjections.Perspective;
    }

    this.onChangeProjection.trigger(this.activeCamera);
  }

  toggle(active: boolean, options?: any) {
    const preventAdjustment = options !== undefined && options.preventOrbitAdjustment;
    if (active && !preventAdjustment) {
      // this.adjustTarget();
    }
    this.enabled = active;
    this.cameraControls.enabled = active;
  }

  async targetItem(mesh: Mesh, duration: number) {
    const center = this.context.getCenter(mesh);
    const cameraEnd = new Vector3()
      .subVectors(this.perspectiveCamera.position, this.currentTarget)
      .add(center);
    this.context.getAnimator().move(this.perspectiveCamera.position, cameraEnd, duration);
    // this.context.getAnimator().move(this.orbitControls.target, center, duration);
    await this.cameraControls.setTarget(center.x, center.y, center.z);
  }

  async goTo(position: Vector3, target: Vector3, duration: number) {
    this.context.getAnimator().move(this.currentCamera.position, position, duration);
    // this.context.getAnimator().move(this.orbitControls.target, target, duration);
    await this.cameraControls.setTarget(target.x, target.y, target.z);
  }

  async goToHomeView() {
    this.context.getAnimator().move(this.perspectiveCamera.position, this.startView.camera);
    const target = this.startView.target;
    await this.cameraControls.setTarget(target.x, target.y, target.z);
    // this.context.getAnimator().move(this.orbitControls.target, this.startView.target);
  }

  async fitModelToFrame() {
    if (!this.enabled) return;
    const { boxCenter, distance } = this.getBoxCenterAndDistance();
    const direction = new Vector3()
      .subVectors(this.perspectiveCamera.position, boxCenter)
      .multiply(new Vector3(1, 0, 1))
      .normalize();
    this.perspectiveCamera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    this.perspectiveCamera.updateProjectionMatrix();
    await this.cameraControls.setTarget(boxCenter.x, boxCenter.y, boxCenter.z);
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

  // private adjustTarget() {
  //   const cameraDir = new Vector3();
  //   this.activeCamera.getWorldDirection(cameraDir);
  //   cameraDir.multiplyScalar(20);
  //   const center = new Vector3().addVectors(cameraDir, this.activeCamera.position);
  //   this.orbitControls.target.set(center.x, center.y, center.z);
  // }

  private async setupOrbitControls() {
    // this.orbitControls.enableDamping = true;
    // this.orbitControls.dampingFactor *= 2;
    // this.orbitControls.target.set(0, 0, 0);
    // const panWithMMB = this.context.options.panWithMMB || true;
    // if (panWithMMB) {
    //   this.orbitControls.mouseButtons = {
    //     RIGHT: MOUSE.RIGHT,
    //     MIDDLE: MOUSE.RIGHT,
    //     LEFT: MOUSE.LEFT
    //   };
    // }
    this.cameraControls.dampingFactor *= 2;
    this.cameraControls.dollyToCursor = true;
    this.cameraControls.infinityDolly = true;
    this.cameraControls.minDistance = 1;
    this.cameraControls.truckSpeed *= 1.5;
    await this.cameraControls.setTarget(0, 0, 0);
  }
}
