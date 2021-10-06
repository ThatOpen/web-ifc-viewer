import { Object3D, Vector3, Matrix3, Intersection, Mesh } from 'three';
import { IfcComponent, Context } from '../../../base-types';
import { IfcPlane } from './planes';

export class IfcClipper extends IfcComponent {
  dragging: boolean;
  planes: IfcPlane[];
  intersection: Intersection | undefined;
  orthogonalY = true;
  toleranceOrthogonalY = 0.7;
  planeSize = 5;
  private enabled: boolean;
  private readonly context: Context;

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
    this.enabled = state;
    this.planes.forEach((plane) => plane.setVisibility(state));
    this.updateMaterials();
  }

  createPlane = () => {
    if (!this.enabled) return;
    const intersects = this.context.castRayIfc();
    if (!intersects) return;
    this.createPlaneFromIntersection(intersects);
    this.intersection = undefined;
  };

  createFromNormalAndCoplanarPoint = (normal: Vector3, point: Vector3) => {
    const plane = new IfcPlane(
      this.context,
      point,
      normal,
      this.activateDragging,
      this.deactivateDragging,
      this.planeSize
    );
    this.planes.push(plane);
    this.context.addClippingPlane(plane.plane);
    this.updateMaterials();
  };

  deletePlane = (plane?: IfcPlane) => {
    let existingPlane: IfcPlane | undefined | null = plane;
    if (!existingPlane) {
      if (!this.enabled) return;
      existingPlane = this.pickPlane();
    }
    if (!existingPlane) return;
    const index = this.planes.indexOf(existingPlane);
    if (index === -1) return;
    existingPlane.removeFromScene();
    this.planes.splice(index, 1);
    this.context.removeClippingPlane(existingPlane.plane);
    this.updateMaterials();
  };

  deleteAllPlanes = () => {
    this.planes.forEach((plane) => {
      plane.removeFromScene();
      this.context.removeClippingPlane(plane.plane);
    });
    this.planes = [];
    this.updateMaterials();
  };

  private pickPlane = () => {
    const planeMeshes = this.planes.map((p) => p.planeMesh);
    const arrowMeshes = this.planes.map((p) => p.arrowBoundingBox);
    const intersects = this.context.castRay([...planeMeshes, ...arrowMeshes]);
    if (intersects.length > 0) {
      return this.planes.find((p) => {
        if (p.planeMesh === intersects[0].object || p.arrowBoundingBox === intersects[0].object) {
          return p;
        }
        return null;
      });
    }
    return null;
  };

  private createPlaneFromIntersection = (intersection: Intersection) => {
    const constant = intersection.point.distanceTo(new Vector3(0, 0, 0));
    const normal = intersection.face?.normal;
    if (!constant || !normal) return;
    const normalMatrix = new Matrix3().getNormalMatrix(intersection.object.matrixWorld);
    const worldNormal = normal.clone().applyMatrix3(normalMatrix).normalize();
    this.normalizePlaneDirectionY(worldNormal);
    const plane = this.newPlane(intersection, worldNormal.negate());
    this.planes.push(plane);
    this.context.addClippingPlane(plane.plane);
    this.updateMaterials();
  };

  private normalizePlaneDirectionY(normal: Vector3) {
    if (this.orthogonalY) {
      if (normal.y > this.toleranceOrthogonalY) {
        normal.x = 0;
        normal.y = 1;
        normal.z = 0;
      }
      if (normal.y < -this.toleranceOrthogonalY) {
        normal.x = 0;
        normal.y = -1;
        normal.z = 0;
      }
    }
  }

  private newPlane(intersection: Intersection, worldNormal: Vector3) {
    return new IfcPlane(
      this.context,
      intersection.point,
      worldNormal,
      this.activateDragging,
      this.deactivateDragging,
      this.planeSize
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
