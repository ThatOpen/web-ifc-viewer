import { Mesh, Vector3 } from 'three';
import { IfcPlane } from '../clipping-planes/planes';

export interface PlanView {
  cameraPosition: Vector3;
  targetPosition: Vector3;
  clipping?: IfcPlane;
}

export class PlanManager {
  plans: PlanView[] = [];
  sectionFill = new Mesh();
}