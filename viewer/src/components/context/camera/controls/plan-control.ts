import { Box3, Camera } from 'three';
import CameraControls from 'camera-controls';
import { IfcComponent, NavigationMode, NavigationModes } from '../../../../base-types';
import { LiteEvent } from '../../../../utils/LiteEvent';
import { IfcCamera } from '../camera';
import { IfcContext } from '../../context';

export class PlanControl extends IfcComponent implements NavigationMode {
  readonly mode = NavigationModes.Plan;
  enabled = false;
  onChange = new LiteEvent<any>();
  onChangeProjection = new LiteEvent<Camera>();

  private readonly defaultAzimuthSpeed: number;
  private readonly defaultPolarSpeed: number;

  constructor(private context: IfcContext, private ifcCamera: IfcCamera) {
    super(context);
    this.defaultAzimuthSpeed = ifcCamera.cameraControls.azimuthRotateSpeed;
    this.defaultPolarSpeed = ifcCamera.cameraControls.polarRotateSpeed;
  }

  toggle(active: boolean) {
    this.enabled = active;
    const controls = this.ifcCamera.cameraControls;
    controls.azimuthRotateSpeed = active ? 0 : this.defaultAzimuthSpeed;
    controls.polarRotateSpeed = active ? 0 : this.defaultPolarSpeed;
    controls.mouseButtons.left = CameraControls.ACTION.ROTATE;
  }

  async fitModelToFrame() {
    if (!this.enabled) return;
    const scene = this.context.getScene();
    console.log(scene);
    const box = new Box3().setFromObject(scene.children[0]);

    await this.ifcCamera.cameraControls.fitToBox(box, false);
  }
}
