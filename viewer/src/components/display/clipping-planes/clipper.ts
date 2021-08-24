import { Object3D, Vector3, Matrix3, Intersection, Mesh } from 'three';
import { IfcComponent, Context } from '../../../base-types';
import { IfcPlane } from './planes';

export class IfcClipper extends IfcComponent {
  dragging: boolean;
  planes: IfcPlane[];
  intersection: Intersection | undefined;
  private enabled: boolean;
  private context: Context;

  constructor(context: Context) {
    super(context);
    this.context = context;
    this.enabled = false;
    this.dragging = false;
    this.planes = [];
  }

  get active() {
    return this.enabled;
  }

  set active(state) {
    console.log(`Clipping Active: ${state}`);
    this.enabled = state;
    this.planes.forEach((plane) => plane.setVisibility(state));
    this.updateMaterials();
  }

  createPlane = () => {
    if (!this.enabled) return;
    const intersects = this.context.castRayIfc();
    this.createPlaneFromIntersection(intersects);
    this.intersection = undefined;
  };

  deletePlane = () => {
    if (!this.enabled) return;
    const plane = this.pickPlane();
    if (!plane) return;
    const index = this.planes.indexOf(plane);
    if (index === -1) return;
    plane.removeFromScene();
    this.planes.splice(index, 1);
    this.context.removeClippingPlane(plane.plane);
    this.updateMaterials();
  };

  private pickPlane = () => {
    const planeMeshes = this.planes.map((p) => p.planeMesh);
    const intersects = this.context.castRay(planeMeshes);
    if (intersects.length <= 0) return null;
    return this.planes.find((p) => p.planeMesh === intersects[0].object);
  };

  private createPlaneFromIntersection = (intersection: Intersection) => {
    const constant = intersection.point.distanceTo(new Vector3(0, 0, 0));
    const normal = intersection.face?.normal;
    if (!constant || !normal) return;
    const normalMatrix = new Matrix3().getNormalMatrix(intersection.object.matrixWorld);
    const worldNormal = normal.clone().applyMatrix3(normalMatrix).normalize();
    const plane = this.newPlane(intersection, worldNormal);
    this.planes.push(plane);
    this.context.addClippingPlane(plane.plane);
    this.updateMaterials();
  };

  private newPlane(intersection: Intersection, worldNormal: Vector3) {
    return new IfcPlane(
      this.context,
      intersection.point,
      worldNormal,
      this.activateDragging,
      this.deactivateDragging
    );
  }

  private activateDragging = () => {
    this.dragging = true;
  };

  private deactivateDragging = () => {
    this.dragging = false;
  };

  private updateMaterials = () => {
    // Applying clipping to IfcObjects only. This could be improved.
    this.context.items.ifcModels.forEach((obj: Object3D) => {
      const mesh = obj as Mesh;
      if (mesh.material) this.updateMaterial(mesh);
      if (mesh.userData.wireframe) this.updateMaterial(mesh.userData.wireframe);
    });
  };

  private updateMaterial(mesh: Mesh) {
    const activePlanes = this.planes.filter((plane) => plane.visible);
    if (!Array.isArray(mesh.material)) {
      mesh.material.clippingPlanes = activePlanes.map((e) => e.plane);
      return;
    }
    mesh.material.forEach((m) => {
      m.clippingPlanes = activePlanes.map((e) => e.plane);
    });
  }
}
