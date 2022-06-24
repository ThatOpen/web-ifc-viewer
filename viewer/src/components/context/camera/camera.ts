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
  IfcComponent,
  NavigationMode,
  NavigationModes,
  NavModeManager
} from '../../../base-types';
import { LiteEvent } from '../../../utils/LiteEvent';
import { FirstPersonControl } from './controls/first-person-control';
import { OrbitControl } from './controls/orbit-control';
import { ProjectionManager } from './projection-manager';
import { PlanControl } from './controls/plan-control';
import { IfcContext } from '../context';

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

const frustumSize = 50;

export class IfcCamera extends IfcComponent {
  readonly perspectiveCamera: PerspectiveCamera;
  readonly orthographicCamera: OrthographicCamera;
  readonly cameraControls: CameraControls;

  navMode: NavModeManager;
  currentNavMode: NavigationMode;

  readonly onChange = new LiteEvent<any>();
  readonly onChangeProjection = new LiteEvent<Camera>();

  private readonly context: IfcContext;
  private readonly projectionManager: ProjectionManager;

  private previousUserInput: any = {};

  constructor(context: IfcContext) {
    super(context);
    this.context = context;

    const dims = this.context.getDimensions();
    const aspect = dims.x / dims.y;
    this.perspectiveCamera = new PerspectiveCamera(45, aspect, 1, 2000);

    this.orthographicCamera = new OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    this.setupCameras();

    CameraControls.install({ THREE: subsetOfTHREE });
    this.cameraControls = new CameraControls(this.perspectiveCamera, context.getDomElement());

    this.navMode = {
      [NavigationModes.Orbit]: new OrbitControl(this.context, this),
      [NavigationModes.FirstPerson]: new FirstPersonControl(this.context, this),
      [NavigationModes.Plan]: new PlanControl(this.context, this)
    };

    this.currentNavMode = this.navMode[NavigationModes.Orbit];
    this.currentNavMode.toggle(true, { preventTargetAdjustment: true });

    Object.values(this.navMode).forEach((mode) => {
      mode.onChange.on(this.onChange.trigger);
      mode.onChangeProjection.on(this.onChangeProjection.trigger);
    });

    this.projectionManager = new ProjectionManager(context, this);
    this.setupControls();
  }

  dispose() {
    this.perspectiveCamera.removeFromParent();
    (this.perspectiveCamera as any) = null;
    this.orthographicCamera.removeFromParent();
    (this.orthographicCamera as any) = null;
    this.cameraControls.dispose();
    (this.cameraControls as any) = null;
    (this.navMode as any) = null;
    (this.context as any) = null;
    (this.projectionManager as any) = null;
  }

  get projection() {
    return this.projectionManager.projection;
  }

  set projection(projection: CameraProjections) {
    this.projectionManager.projection = projection;
  }

  /**
   * @deprecated Use cameraControls instead.
   */
  get controls() {
    return this.cameraControls;
  }

  get activeCamera() {
    return this.projectionManager.activeCamera;
  }

  update(_delta: number) {
    super.update(_delta);
    if (this.cameraControls.enabled) {
      this.cameraControls.update(_delta);
    }
  }

  updateAspect(dims?: Vector2) {
    if (!dims) dims = this.context.getDimensions();
    this.perspectiveCamera.aspect = dims.x / dims.y;
    this.perspectiveCamera.updateProjectionMatrix();
    this.setOrthoCameraAspect(dims);
  }

  /**
   * @deprecated Use onChange.on() instead.
   */
  submitOnChange(action: (event: any) => void) {
    this.onChange.on(action);
  }

  setNavigationMode(mode: NavigationModes) {
    if (this.currentNavMode.mode === mode) return;
    this.currentNavMode.toggle(false);
    this.currentNavMode = this.navMode[mode];
    this.currentNavMode.toggle(true);
  }

  toggleCameraControls(active: boolean) {
    this.cameraControls.enabled = active;
  }

  toggleProjection() {
    const isOrto = this.projection === CameraProjections.Orthographic;
    this.projection = isOrto ? CameraProjections.Perspective : CameraProjections.Orthographic;
    this.onChangeProjection.trigger(this.activeCamera);
  }

  async targetItem(mesh: Mesh) {
    const center = this.context.getCenter(mesh);
    await this.cameraControls.moveTo(center.x, center.y, center.z, true);
  }

  toggleUserInput(active: boolean) {
    console.log(this.previousUserInput);
    if (active) {
      if (Object.keys(this.previousUserInput).length === 0) return;
      this.cameraControls.mouseButtons.left = this.previousUserInput.left;
      this.cameraControls.mouseButtons.right = this.previousUserInput.right;
      this.cameraControls.mouseButtons.middle = this.previousUserInput.middle;
      this.cameraControls.mouseButtons.wheel = this.previousUserInput.wheel;
    } else {
      this.previousUserInput.left = this.cameraControls.mouseButtons.left;
      this.previousUserInput.right = this.cameraControls.mouseButtons.right;
      this.previousUserInput.middle = this.cameraControls.mouseButtons.middle;
      this.previousUserInput.wheel = this.cameraControls.mouseButtons.wheel;

      this.cameraControls.mouseButtons.left = 0;
      this.cameraControls.mouseButtons.right = 0;
      this.cameraControls.mouseButtons.middle = 0;
      this.cameraControls.mouseButtons.wheel = 0;
    }
  }

  private setOrthoCameraAspect(dims: Vector2) {
    const aspect = dims.x / dims.y;
    this.orthographicCamera.left = (-frustumSize * aspect) / 2;
    this.orthographicCamera.right = (frustumSize * aspect) / 2;
    this.orthographicCamera.top = frustumSize / 2;
    this.orthographicCamera.bottom = -frustumSize / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  // private setOrbitControls() {
  //   this.setNavigationMode(NavigationModes.Orbit);
  //   return this.currentNavMode as OrbitControl;
  // }

  private setupCameras() {
    this.setCameraPositionAndTarget(this.perspectiveCamera);
    this.setCameraPositionAndTarget(this.perspectiveCamera);
  }

  private setCameraPositionAndTarget(camera: Camera) {
    camera.position.z = 10;
    camera.position.y = 10;
    camera.position.x = 10;
    camera.lookAt(new Vector3(0, 0, 0));
  }

  private setupControls() {
    this.cameraControls.dampingFactor = 0.2;
    this.cameraControls.dollyToCursor = true;
    this.cameraControls.infinityDolly = true;
    this.cameraControls.setTarget(0, 0, 0);
  }
}
