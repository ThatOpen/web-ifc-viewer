import { Mesh, Vector3 } from 'three';
import { IFCBUILDINGSTOREY } from 'web-ifc';
import { IfcPlane } from '../clipping-planes/planes';
import { IfcClipper } from '../clipping-planes/clipper';
import { CameraProjections, Context, NavigationModes } from '../../../base-types';
import { IfcManager } from '../../ifc';

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

  active = false;
  currentPlan?: PlanView;

  private previousCamera = new Vector3();
  private previousTarget = new Vector3();
  private previousProjection = CameraProjections.Perspective;

  private storeys: any[] = [];

  constructor(private ifc: IfcManager, private context: Context, private clipper: IfcClipper) {
    this.sectionFill = new Mesh();
  }

  getAll() {
    return Object.keys(this.plans);
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

  async goTo(name: string, animate = false) {
    if (this.plans[name] === undefined) throw new Error('The specified plan is undefined!');

    const plane = this.currentPlan?.plane;
    if (plane) this.clipper.setPlaneActive(plane, false);

    if (!this.active) {
      this.context.getCamera().getWorldPosition(this.previousCamera);
      this.context.ifcCamera.cameraControls.getTarget(this.previousTarget);
      this.previousProjection = this.context.ifcCamera.projection;
    }
    this.active = true;

    this.currentPlan = this.plans[name];
    const { x, y, z } = this.currentPlan.camera;
    const target = this.currentPlan.target;
    this.context.ifcCamera.setNavigationMode(NavigationModes.Plan);

    const mode = this.currentPlan.ortho
      ? CameraProjections.Orthographic
      : CameraProjections.Perspective;
    this.context.ifcCamera.projection = mode;

    if (this.currentPlan.plane) {
      this.clipper.setPlaneActive(this.currentPlan.plane, true);
    }

    await this.context.ifcCamera.cameraControls.setLookAt(
      x,
      y,
      z,
      target.z,
      target.y,
      target.z,
      animate
    );
  }

  exitPlanView(animate = false) {
    this.context.ifcCamera.setNavigationMode(NavigationModes.Orbit);
    this.context.ifcCamera.projection = this.previousProjection;
    this.active = false;
    if (this.currentPlan && this.currentPlan.plane) {
      this.clipper.setPlaneActive(this.currentPlan.plane, false);
    }
    this.currentPlan = undefined;
    this.context.ifcCamera.cameraControls.setLookAt(
      this.previousCamera.x,
      this.previousCamera.y,
      this.previousCamera.z,
      this.previousTarget.x,
      this.previousTarget.y,
      this.previousTarget.z,
      animate
    );
  }

  async computeAllPlanViews(modelID: number) {
    if (this.storeys.length === 0) {
      const foundStoreys = await this.ifc.getAllItemsOfType(modelID, IFCBUILDINGSTOREY, true);
      this.storeys.push(...foundStoreys);
    }

    const center = this.context.getCenter(this.context.items.ifcModels[modelID]);
    this.storeys.forEach((storey) => {
      let elevation = storey.Elevation.value;
      if (elevation > 100 || elevation < -100) elevation /= 1000; // very very dirty trick
      this.create({
        name: storey.LongName.value,
        target: new Vector3(0, 0, 0),
        camera: new Vector3(0, elevation + 30, 0),
        point: new Vector3(center.x, elevation + 1, center.z),
        normal: new Vector3(0, -1, 0),
        rotation: 0,
        ortho: true
      });
    });
  }
}
