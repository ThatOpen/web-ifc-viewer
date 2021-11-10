import { Mesh, Vector3 } from 'three';
import { IfcPlane } from '../clipping-planes/planes';
import { IfcClipper } from '../clipping-planes/clipper';
import { CameraProjections, Context, NavigationModes } from '../../../base-types';

export interface PlanViewConfig {
  name: string;
  camera: Vector3;
  target: Vector3;
  normal?: Vector3;
  point?: Vector3;
  ortho?: boolean;
  rotation?: number;
}

export interface PlanView extends PlanViewConfig {
  plane?: IfcPlane;
}

export class PlanManager {
  plans: { [name: string]: PlanView } = {};
  sectionFill: Mesh;

  constructor(private context: Context, private clipper: IfcClipper) {
    this.sectionFill = new Mesh();
  }

  create(config: PlanViewConfig) {
    if (this.plans[config.name] !== undefined) return;
    const { name, camera, target } = config;
    const ortho = config.ortho || true;
    this.plans[config.name] = { name, camera, target, ortho };

    if (config.normal && config.point) {
      const { normal, point } = config;
      const plane = this.clipper.createFromNormalAndCoplanarPoint(normal, point);
      plane.setVisibility(false);
      this.clipper.setPlaneActive(plane, false);
      this.plans[name].plane = plane;
    }
  }

  async goTo(name: string) {
    if (this.plans[name] === undefined) throw new Error('The specified plan is undefined!');
    const plan = this.plans[name];
    const { x, y, z } = plan.camera;
    const target = plan.target;
    this.context.ifcCamera.setNavigationMode(NavigationModes.Plan);
    await this.context.ifcCamera.cameraControls.setLookAt(x, y, z, target.z, target.y, target.z);
    const mode = plan.ortho ? CameraProjections.Orthographic : CameraProjections.Perspective;
    this.context.ifcCamera.projection = mode;
    if (plan.plane) {
      this.clipper.setPlaneActive(plan.plane, true);
    }
  }
}
