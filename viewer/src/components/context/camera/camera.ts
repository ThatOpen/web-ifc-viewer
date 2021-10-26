import { Camera, Mesh, OrthographicCamera, PerspectiveCamera, Vector3 } from 'three';
import {
  CameraProjections,
  Context,
  IfcComponent,
  MouseButtons,
  NavigationMode,
  NavigationModes,
  NavModeManager
} from '../../../base-types';
import { LiteEvent } from '../../../utils/LiteEvent';
import { FirstPersonControl } from './FirstPersonControl';
import { OrbitControl } from './OrbitControl';

const frustumSize = 50;

export class IfcCamera extends IfcComponent {
  perspectiveCamera: PerspectiveCamera;
  orthographicCamera: OrthographicCamera;

  navMode: NavModeManager;
  currentNavMode: NavigationMode;
  public readonly onChange = new LiteEvent<any>();
  public readonly onUnlock = new LiteEvent<any>();
  public readonly onChangeProjection = new LiteEvent<Camera>();
  private readonly context: Context;

  constructor(context: Context) {
    super(context);
    this.context = context;

    const dims = this.context.getDimensions();
    const aspect = dims.x / dims.y;
    this.perspectiveCamera = new PerspectiveCamera(45, aspect, 0.1, 1000);
    this.orthographicCamera = new OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    this.setupCamera();

    this.navMode = {
      [NavigationModes.Orbit]: new OrbitControl(
        this.context,
        this.perspectiveCamera,
        this.orthographicCamera
      ),
      [NavigationModes.FirstPerson]: new FirstPersonControl(
        this.context,
        this.perspectiveCamera,
        this
      )
    };

    this.currentNavMode = this.navMode[NavigationModes.Orbit];
    this.currentNavMode.toggle(true, { preventTargetAdjustment: true });

    Object.values(this.navMode).forEach((mode) => {
      mode.onChange.on(this.onChange.trigger);
      mode.onUnlock.on(this.onUnlock.trigger);
      mode.onChangeProjection.on(this.onChangeProjection.trigger);
    });
  }

  get target() {
    const orbitControls = this.navMode[NavigationModes.Orbit];
    return orbitControls.target;
  }

  get activeCamera() {
    return this.currentNavMode.mode === NavigationModes.FirstPerson
      ? this.perspectiveCamera
      : this.navMode[NavigationModes.Orbit].activeCamera;
  }

  get projection() {
    return this.navMode[NavigationModes.Orbit].projection;
  }

  set projection(projection: CameraProjections) {
    this.navMode[NavigationModes.Orbit].projection = projection;
  }

  updateAspect() {
    const dims = this.context.getDimensions();
    const aspect = dims.x / dims.y;

    this.perspectiveCamera.aspect = dims.x / dims.y;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left = (-frustumSize * aspect) / 2;
    this.orthographicCamera.right = (frustumSize * aspect) / 2;
    this.orthographicCamera.top = frustumSize / 2;
    this.orthographicCamera.bottom = -frustumSize / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  /**
   * @deprecated Use onChange.on() instead.
   */
  submitOnChange(action: (event: any) => void) {
    this.onChange.on(action);
  }

  /**
   * @deprecated Use onUnlock.on() instead.
   */
  submitOnUnlock(action: (event: any) => void) {
    this.onUnlock.on(action);
  }

  setNavigationMode(mode: NavigationModes) {
    this.currentNavMode.toggle(false);
    this.currentNavMode = this.navMode[mode];
    this.currentNavMode.toggle(true);
  }

  setOrbitControlsButtons(buttons: MouseButtons) {
    const orbitControls = this.setOrbitControls();
    orbitControls.setOrbitControlsButtons(buttons);
  }

  toggleCameraControls(active: boolean, options?: any) {
    this.currentNavMode.toggle(active, options);
  }

  toggleProjection() {
    this.navMode[NavigationModes.Orbit].toggleProjection();
  }

  targetItem(mesh: Mesh, duration = 1) {
    const orbitControls = this.setOrbitControls();
    orbitControls.targetItem(mesh, duration);
  }

  goTo(position: Vector3, target: Vector3, duration = 0) {
    const orbitControls = this.setOrbitControls();
    orbitControls.goTo(position, target, duration);
  }

  goToHomeView() {
    const orbitControls = this.setOrbitControls();
    orbitControls.goToHomeView();
  }

  setHomeView(camera: Vector3, target: Vector3) {
    const orbitControls = this.navMode[NavigationModes.Orbit];
    orbitControls.homeView = { camera, target };
  }

  unlock() {
    const firstPerson = this.navMode[NavigationModes.FirstPerson];
    firstPerson.controls.unlock();
  }

  private setOrbitControls() {
    this.setNavigationMode(NavigationModes.Orbit);
    return this.currentNavMode as OrbitControl;
  }

  private setupCamera() {
    this.perspectiveCamera.position.z = 10;
    this.perspectiveCamera.position.y = 10;
    this.perspectiveCamera.position.x = 10;
    this.perspectiveCamera.lookAt(new Vector3(0, 0, 0));

    this.orthographicCamera.position.z = 10;
    this.orthographicCamera.position.y = 10;
    this.orthographicCamera.position.x = 10;
    this.orthographicCamera.lookAt(new Vector3(0, 0, 0));
  }
}
