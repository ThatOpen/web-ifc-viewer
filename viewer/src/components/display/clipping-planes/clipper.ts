import { Vector3, Matrix3, Intersection, Mesh, Plane } from 'three';
import { Subsets } from 'web-ifc-three/IFC/components/subsets/SubsetManager';
import { IfcComponent } from '../../../base-types';
import { IfcPlane } from './planes';
import { IfcManager } from '../../ifc';
import { IfcContext } from '../../context';

export class IfcClipper extends IfcComponent {
  dragging: boolean;
  planes: IfcPlane[];
  intersection: Intersection | undefined;
  orthogonalY = true;
  toleranceOrthogonalY = 0.7;
  planeSize = 5;
  private edgesEnabled: boolean;
  private enabled: boolean;
  private readonly context: IfcContext;
  private readonly ifc: IfcManager;

  constructor(context: IfcContext, ifc: IfcManager) {
    super(context);
    this.context = context;
    this.ifc = ifc;
    this.enabled = false;
    this.edgesEnabled = true;
    this.dragging = false;
    this.planes = [];
  }

  get active() {
    return this.enabled;
  }

  set active(state) {
    this.enabled = state;
    this.planes.forEach((plane) => {
      if (!plane.isPlan) {
        plane.visible = state;
        plane.active = state;
      }
    });
    this.updateMaterials();
    this.context.renderer.postProduction.visible = true;
  }

  get edgesActive() {
    return this.edgesEnabled;
  }

  set edgesActive(state: boolean) {
    this.edgesEnabled = state;
    this.planes.forEach((plane) => {
      plane.edgesActive = state;
    });
  }

  toggle() {
    this.active = !this.active;
  }

  dispose() {
    this.planes.forEach((plane) => plane.dispose());
    this.planes.length = 0;
    (this.context as any) = null;
    (this.ifc as any) = null;
  }

  createPlane = () => {
    if (!this.enabled) return;
    const intersects = this.context.castRayIfc();
    if (!intersects) return;
    this.createPlaneFromIntersection(intersects);
    this.intersection = undefined;
  };

  createFromNormalAndCoplanarPoint = (normal: Vector3, point: Vector3, isPlan = false) => {
    const plane = new IfcPlane(
      this.context,
      point,
      normal,
      this.activateDragging,
      this.deactivateDragging,
      this.planeSize,
      this.edgesEnabled
    );
    plane.isPlan = isPlan;
    this.planes.push(plane);
    this.context.addClippingPlane(plane.plane);
    this.updateMaterials();
    return plane;
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
    this.context.renderer.postProduction.update();
  };

  deleteAllPlanes = () => {
    while (this.planes.length > 0) {
      this.deletePlane(this.planes[0]);
    }
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
      this.planeSize,
      this.edgesEnabled
    );
  }

  private activateDragging = () => {
    this.dragging = true;
    this.context.renderer.postProduction.visible = false;
  };

  private deactivateDragging = () => {
    this.dragging = false;
    this.context.renderer.postProduction.visible = true;
  };

  private updateMaterials = () => {
    // Apply clipping to all models
    const planes = this.context.getClippingPlanes();
    this.context.items.ifcModels.forEach((model) => {
      if (Array.isArray(model.material)) {
        model.material.forEach((mat) => (mat.clippingPlanes = planes));
      } else {
        model.material.clippingPlanes = planes;
      }
    });
    // Applying clipping to all subsets. then we can also filter and apply only to specified subsest as parameter
    Object.values(this.ifc.loader.ifcManager.subsets.getAllSubsets()).forEach(
      (subset: Subsets[string]) => {
        const mesh = subset.mesh as Mesh;
        if (mesh.material) this.updateMaterial(mesh, planes);
        if (mesh.userData.wireframe) this.updateMaterial(mesh.userData.wireframe, planes);
      }
    );
  };

  private updateMaterial(mesh: Mesh, planes: Plane[]) {
    if (!Array.isArray(mesh.material)) {
      mesh.material.clippingPlanes = planes;
      return;
    }
    mesh.material.forEach((m) => {
      m.clippingPlanes = planes;
    });
  }
}
