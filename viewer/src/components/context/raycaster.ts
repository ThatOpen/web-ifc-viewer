import { Intersection, Object3D, Raycaster } from 'three';
import { IfcMouse } from './mouse';
import { IfcComponent, Context } from '../../base-types';

export class IfcRaycaster extends IfcComponent {
  private readonly raycaster: Raycaster;
  private readonly mouse: IfcMouse;
  private readonly context: Context;

  constructor(context: Context) {
    super(context);
    this.context = context;
    this.raycaster = new Raycaster();
    this.mouse = new IfcMouse(context);
  }

  castRay(items: Object3D[]) {
    const camera = this.context.getCamera();
    this.raycaster.setFromCamera(this.mouse.position, camera);
    return this.raycaster.intersectObjects(items);
  }

  castRayIfc() {
    const items = this.castRay(this.context.items.pickableIfcModels);
    const filtered = this.filterClippingPlanes(items);
    return filtered.length > 0 ? filtered[0] : null;
  }

  private filterClippingPlanes(objs: Intersection[]) {
    const planes = this.context.getClippingPlanes();
    if (objs.length <= 0 || !planes || planes?.length <= 0) return objs;
    // const planes = this.clipper?.planes.map((p) => p.plane);
    return objs.filter((elem) => planes.every((elem2) => elem2.distanceToPoint(elem.point) > 0));
  }
}
