import { Intersection, Object3D, Raycaster } from 'three';
import { IfcComponent } from '../../base-types';
import { IfcContext } from './context';

export class IfcRaycaster extends IfcComponent {
  private readonly raycaster: Raycaster;
  private readonly context: IfcContext;

  constructor(context: IfcContext) {
    super(context);
    this.context = context;
    this.raycaster = new Raycaster();
  }

  dispose() {
    (this.raycaster as any) = null;
    (this.context as any) = null;
  }

  castRay(items: Object3D[]) {
    const camera = this.context.getCamera();
    this.raycaster.setFromCamera(this.context.mouse.position, camera);
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
