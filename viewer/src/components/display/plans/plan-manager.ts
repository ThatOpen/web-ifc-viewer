import { Mesh, Vector3 } from 'three';
import { IFCBUILDINGSTOREY, IFCBUILDING } from 'web-ifc';
import { IfcPlane } from '../clipping-planes/planes';
import { IfcClipper } from '../clipping-planes/clipper';
import { CameraProjections, Context, NavigationModes } from '../../../base-types';
import { IfcManager } from '../../ifc';
import { UnitType } from '../../ifc/units';

export interface PlanViewConfig {
  modelID: number;
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
  planLists: { [modelID: number]: { [name: string]: PlanView } } = {};
  sectionFill: Mesh;

  active = false;
  currentPlan?: PlanView;

  defaultSectionOffset = 1.5;
  defaultCameraOffset = 30;

  private previousCamera = new Vector3();
  private previousTarget = new Vector3();
  private previousProjection = CameraProjections.Perspective;

  private storeys: { [modelID: number]: any[] } = [];

  constructor(private ifc: IfcManager, private context: Context, private clipper: IfcClipper) {
    this.sectionFill = new Mesh();
  }

  getAll() {
    return Object.keys(this.planLists);
  }

  async create(config: PlanViewConfig) {
    // if (this.planList[config.name] !== undefined) return;
    const { modelID, name, camera, target } = config;
    const ortho = config.ortho || true;

    if (this.planLists[modelID] === undefined) {
      this.planLists[modelID] = {};
    }

    const currentPlanlist = this.planLists[modelID];

    if (currentPlanlist[name]) return;
    currentPlanlist[name] = { modelID, name, camera, target, ortho };

    if (config.normal && config.point) {
      const { normal, point } = config;
      const plane = this.clipper.createFromNormalAndCoplanarPoint(normal, point, true);
      plane.visible = false;
      plane.active = false;
      currentPlanlist[name].plane = plane;
      await plane.edges.updateEdges();
      plane.edges.visible = false;
    }
  }

  async goTo(modelID: number, name: string, animate = false) {
    if (this.currentPlan?.modelID === modelID && this.currentPlan.name === name) return;

    if (!this.active) {
      this.context.getCamera().getWorldPosition(this.previousCamera);
      this.context.ifcCamera.cameraControls.getTarget(this.previousTarget);
      this.previousProjection = this.context.ifcCamera.projection;
    }

    this.active = true;

    if (this.planLists[modelID] === undefined) throw new Error('The specified plan is undefined!');
    const currentPlanList = this.planLists[modelID];
    if (currentPlanList[name] === undefined) throw new Error('The specified plan is undefined!');

    const plane = this.currentPlan?.plane;
    if (plane) plane.active = false;

    if (!currentPlanList[name]) return;
    this.currentPlan = currentPlanList[name];
    const { x, y, z } = this.currentPlan.camera;
    const target = this.currentPlan.target;
    this.context.ifcCamera.setNavigationMode(NavigationModes.Plan);

    const mode = this.currentPlan.ortho
      ? CameraProjections.Orthographic
      : CameraProjections.Perspective;
    this.context.ifcCamera.projection = mode;

    if (this.currentPlan.plane) {
      this.currentPlan.plane.active = true;
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
    if (!this.active) return;
    this.active = false;

    this.context.ifcCamera.setNavigationMode(NavigationModes.Orbit);
    this.context.ifcCamera.projection = this.previousProjection;
    if (this.currentPlan && this.currentPlan.plane) {
      this.currentPlan.plane.active = false;
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
    if (!this.storeys[modelID]) {
      this.storeys[modelID] = await this.ifc.getAllItemsOfType(modelID, IFCBUILDINGSTOREY, true);
    }

    const allBuildingsIDs = await this.ifc.getAllItemsOfType(modelID, IFCBUILDING, false);
    const buildingID = allBuildingsIDs[0];
    const building = await this.ifc.getProperties(modelID, buildingID, false, true);

    const unitsScale = await this.ifc.units.getUnits(modelID, UnitType.LENGTHUNIT);

    // const buildingPlace = building.ObjectPlacement.Location;
    // const buildingCoords = buildingPlace.Coordinates.map((coord: any) => coord.value * unitsScale);

    const sitePlace = building.ObjectPlacement.PlacementRelTo.RelativePlacement.Location;
    const siteCoords = sitePlace.Coordinates.map((coord: any) => coord.value);

    const transformMatrix = await this.ifc.loader.ifcManager.ifcAPI.GetCoordinationMatrix(modelID);
    const transformHeight = transformMatrix[13];

    const storeys = this.storeys[modelID];
    for (let i = 0; i < storeys.length; i++) {
      const storey = storeys[i];
      const baseHeight = storey.Elevation.value;
      const elevation = (baseHeight + siteCoords[2]) * unitsScale + transformHeight;
      // eslint-disable-next-line no-await-in-loop
      await this.create({
        modelID,
        name: storey.LongName.value,
        target: new Vector3(0, 0, 0),
        camera: new Vector3(0, elevation + this.defaultCameraOffset, 0),
        point: new Vector3(0, elevation + this.defaultSectionOffset, 0),
        normal: new Vector3(0, -1, 0),
        rotation: 0,
        ortho: true
      });
    }
  }
}
