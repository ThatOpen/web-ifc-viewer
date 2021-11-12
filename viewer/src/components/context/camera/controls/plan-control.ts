import { Camera } from 'three';
import { Context, IfcComponent, NavigationMode, NavigationModes } from '../../../../base-types';
import { LiteEvent } from '../../../../utils/LiteEvent';
import { IfcCamera } from '../camera';

export class PlanControl extends IfcComponent implements NavigationMode {
  readonly mode = NavigationModes.Plan;
  enabled = false;
  onChange = new LiteEvent<any>();
  onChangeProjection = new LiteEvent<Camera>();

  private readonly defaultAzimuthSpeed: number;
  private readonly defaultPolarSpeed: number;

  constructor(context: Context, private ifcCamera: IfcCamera) {
    super(context);
    this.defaultAzimuthSpeed = ifcCamera.cameraControls.azimuthRotateSpeed;
    this.defaultPolarSpeed = ifcCamera.cameraControls.polarRotateSpeed;
  }

  toggle(active: boolean) {
    this.enabled = active;
    const controls = this.ifcCamera.cameraControls;
    controls.azimuthRotateSpeed = active ? 0 : this.defaultAzimuthSpeed;
    controls.polarRotateSpeed = active ? 0 : this.defaultPolarSpeed;
  }
}
