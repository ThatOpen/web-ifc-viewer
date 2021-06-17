import * as THREE from 'three';

let planes: any[] = [];

export class IFCRaycaster {
  private camera: THREE.Camera;
  private ifcModels: THREE.Object3D[];
  private raycaster: THREE.Raycaster;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;

  constructor(ifcModels: THREE.Object3D[], camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.camera = camera;
    this.canvas = renderer.domElement;
    this.ifcModels = ifcModels;
    this.raycaster = new THREE.Raycaster();
    this.renderer = renderer;
    // @ts-ignore
    // this.raycaster.firstHitOnly = true;
  }

  castRay(event: any, onHit: (_event: any, _item: THREE.Intersection) => any) {
    const mouse = this.getMouseProjection(event);
    this.raycaster.setFromCamera(mouse, this.camera);
    const items = this.raycaster.intersectObjects(this.ifcModels);
    const result = this.filterClippingPlanes(items);
    if (result.length > 0) return onHit(event, result[0]);
    return null;
  }

  private filterClippingPlanes(objs: THREE.Intersection[]) {
    if (objs.length <= 0) return objs;
    // @ts-ignore
    planes = this.camera.planes as any[];
    if (!planes) return objs;
    if (planes.length <= 0) return objs;
    // return objs.filter((elem) => planes.every((elem2) => elem2.distanceToPoint(elem.point) > 0));
    return objs.filter(this.filter);
  }

  private filter(elem: any) {
    return planes.every((elem2) => elem2.distanceToPoint(elem.point) > 0);
  }

  private getMouseProjection(event: any) {
    const mouse = new THREE.Vector2();
    const bounds = this.canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
    mouse.y = -((event.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;
    return mouse;
  }
}
