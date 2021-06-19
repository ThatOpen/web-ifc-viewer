import { Camera, Intersection, Object3D, Raycaster, WebGLRenderer } from 'three';
import { Component, Items } from '../../base-types';
import { IfcClipper } from '../display';
import { IfcMouse } from './mouse';

export class IfcRaycaster extends Component {
  private readonly raycaster: Raycaster;
  private readonly mouse: IfcMouse;
  private readonly camera: Camera;
  private readonly context: Items;
  private clipper?: IfcClipper;

  constructor(context: Items, camera: Camera, renderer: WebGLRenderer) {
    super();
    this.context = context;
    this.raycaster = new Raycaster();
    this.mouse = new IfcMouse(renderer);
    this.camera = camera;
  }

  castRay(items: Object3D[]) {
    this.raycaster.setFromCamera(this.mouse.position, this.camera);
    return this.raycaster.intersectObjects(items);
  }

  castRayIfc() {
    const items = this.castRay(this.context.ifcModels);
    return this.filterClippingPlanes(items)[0];
  }

  setClipper(clipper: IfcClipper) {
    this.clipper = clipper;
  }

  private filterClippingPlanes(objs: Intersection[]) {
    if (objs.length <= 0) return objs;
    const planes = this.clipper?.planes.map((p) => p.plane);
    if (!planes || planes.length === 0) return objs;
    return objs.filter((elem) => planes.every((elem2) => elem2.distanceToPoint(elem.point) > 0));
  }
}
