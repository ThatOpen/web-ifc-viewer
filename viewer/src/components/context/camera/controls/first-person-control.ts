import CameraControls from 'camera-controls';
import { Camera, Vector3 } from 'three';
import {
  CameraProjections,
  IfcComponent,
  NavigationMode,
  NavigationModes
} from '../../../../base-types';
import { IfcCamera } from '../camera';
import { LiteEvent } from '../../../../utils/LiteEvent';
import { IfcContext } from '../../context';

export class FirstPersonControl extends IfcComponent implements NavigationMode {
  readonly mode = NavigationModes.FirstPerson;
  enabled = false;
  onChange = new LiteEvent<any>();
  onChangeProjection = new LiteEvent<Camera>();

  constructor(context: IfcContext, private ifcCamera: IfcCamera) {
    super(context);
  }

  toggle(active: boolean) {
    this.enabled = active;
    if (active) {
      if (this.ifcCamera.projection !== CameraProjections.Perspective) {
        this.ifcCamera.setNavigationMode(NavigationModes.Orbit);
        return;
      }
      this.setupFirstPersonCamera();
    }
  }

  setupFirstPersonCamera() {
    const controls = this.ifcCamera.cameraControls;
    const cameraPosition = new Vector3();
    controls.camera.getWorldPosition(cameraPosition);
    const newTargetPosition = new Vector3();
    controls.distance--;
    controls.camera.getWorldPosition(newTargetPosition);
    controls.minDistance = 1;
    controls.maxDistance = 1;
    controls.distance = 1;
    controls.moveTo(newTargetPosition.x, newTargetPosition.y, newTargetPosition.z);
    this.ifcCamera.cameraControls.truckSpeed = 50;
    controls.mouseButtons.wheel = CameraControls.ACTION.DOLLY;
    controls.touches.two = CameraControls.ACTION.TOUCH_ZOOM_TRUCK;
  }

  fitModelToFrame() {}
}
