// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Box3, Camera, Sphere, Vector3 } from 'three';
import { IfcComponent, NavigationMode, NavigationModes } from '../../../../base-types';
import { LiteEvent } from '../../../../utils/LiteEvent';
import { IfcCamera } from '../camera';
import { IfcContext } from '../../context';

export class OrbitControl extends IfcComponent implements NavigationMode {
  enabled = true;

  readonly mode = NavigationModes.Orbit;
  readonly onChange = new LiteEvent();
  readonly onUnlock = new LiteEvent();
  readonly onChangeProjection = new LiteEvent<Camera>();

  constructor(private context: IfcContext, private ifcCamera: IfcCamera) {
    super(context);
    this.activateOrbitControls();
  }

  /**
   * @deprecated Use cameraControls.getTarget.
   */
  get target() {
    const target = new Vector3();
    this.ifcCamera.cameraControls.getTarget(target);
    return target;
  }

  toggle(active: boolean) {
    this.enabled = active;
    if (active) {
      this.activateOrbitControls();
    }
  }

  async fitModelToFrame() {
    if (!this.enabled) return;
    const scene = this.context.getScene();
    const box = new Box3().setFromObject(scene.children[scene.children.length - 1]);
    const sceneSize = new Vector3();
    box.getSize(sceneSize);
    const sceneCenter = new Vector3();
    box.getCenter(sceneCenter);
    const nearFactor = 0.5;
    const radius = Math.max(sceneSize.x, sceneSize.y, sceneSize.z) * nearFactor;
    const sphere = new Sphere(sceneCenter, radius);
    await this.ifcCamera.cameraControls.fitToSphere(sphere, true);
  }

  private activateOrbitControls() {
    const controls = this.ifcCamera.cameraControls;
    controls.minDistance = 1;
    controls.maxDistance = 300;
    this.ifcCamera.cameraControls.truckSpeed = 2;
  }
}
