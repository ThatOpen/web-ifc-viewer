import * as THREE from 'three';

export class IFCRaycaster {
  private camera: THREE.Camera;
  private ifcModels: THREE.Object3D[];
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;

  constructor(ifcModels: THREE.Object3D[], camera: THREE.Camera, mouse: THREE.Vector2) {
    this.camera = camera;
    this.mouse = mouse;
    this.ifcModels = ifcModels;
    this.raycaster = new THREE.Raycaster();
    // @ts-ignore
    this.raycaster.firstHitOnly = true;
  }

  castRay(event: any, onHit: (event: any, item: THREE.Intersection) => any) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const result = this.raycaster.intersectObjects(this.ifcModels);
    if (result.length > 0) return onHit(event, result[0]);
  }
}
