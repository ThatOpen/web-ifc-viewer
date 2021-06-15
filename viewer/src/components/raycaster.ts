import * as THREE from 'three';

export class IFCRaycaster {
  private camera: THREE.Camera;
  private ifcModels: THREE.Object3D[];
  private raycaster: THREE.Raycaster;
  private canvas: HTMLCanvasElement;

  constructor(ifcModels: THREE.Object3D[], camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.camera = camera;
    this.canvas = renderer.domElement;
    this.ifcModels = ifcModels;
    this.raycaster = new THREE.Raycaster();
    //@ts-ignore
    this.raycaster.firstHitOnly = true;
  }

  castRay(event: any, onHit: (event: any, item: THREE.Intersection) => any ) {
    const mouse = new THREE.Vector2();
    const canvasBounds = this.canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
    mouse.y = -((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1; 
    this.raycaster.setFromCamera(mouse, this.camera);
    const result = this.raycaster.intersectObjects(this.ifcModels);
    if(result.length > 0) return onHit(event, result[0]);
  }
}
