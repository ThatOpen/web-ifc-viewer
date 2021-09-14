import { Mesh, PerspectiveCamera, Vector3 } from 'three';
import { Context, IfcComponent, NavigationMode, NavigationModes, NavModeManager } from '../../../base-types';
import { FirstPersonControl } from './FirstPersonControl';
import { OrbitControl } from './OrbitControl';

export class IfcCamera extends IfcComponent {
  camera: PerspectiveCamera;

  navMode: NavModeManager;
  currentNavMode: NavigationMode;

  private readonly context: Context;

  constructor(context: Context) {
    super(context);
    this.context = context;

    const dims = this.context.getDimensions();
    this.camera = new PerspectiveCamera(45, dims.x / dims.y, 0.1, 1000);
    this.setupCamera();

    this.navMode = {
      [NavigationModes.Orbit]: new OrbitControl(this.context, this.camera),
      [NavigationModes.FirstPerson]: new FirstPersonControl(this.context, this.camera, this)
    };

    this.currentNavMode = this.navMode[NavigationModes.Orbit];
    this.currentNavMode.toggle(true, { preventTargetAdjustment: true });
  }

  updateAspect() {
    const dims = this.context.getDimensions();
    this.camera.aspect = dims.x / dims.y;
    this.camera.updateProjectionMatrix();
  }

  setNavigationMode(mode: NavigationModes) {
    this.currentNavMode.toggle(false);
    this.currentNavMode = this.navMode[mode];
    this.currentNavMode.toggle(true);
  }

  toggleCameraControls(active: boolean) {
    this.currentNavMode.toggle(active);
  }

  targetItem(mesh: Mesh) {
    const orbitControls = this.setOrbitControls();
    orbitControls.targetItem(mesh);
  }

  goToHomeView() {
    const orbitControls = this.setOrbitControls();
    orbitControls.goToHomeView();
  }

  private setOrbitControls() {
    this.setNavigationMode(NavigationModes.Orbit);
    return this.currentNavMode as OrbitControl;
  }

  private setupCamera() {
    this.camera.position.z = 8;
    this.camera.position.y = 8;
    this.camera.position.x = 8;
    this.camera.lookAt(new Vector3(0, 0, 0));
  }
}
