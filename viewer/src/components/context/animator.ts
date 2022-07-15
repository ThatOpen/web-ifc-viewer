import gsap from 'gsap';
import { Vector3 } from 'three';

export class Animator {
  readonly transformer: any;

  constructor() {
    this.transformer = gsap;
  }

  dispose() {
    (this.transformer as any) = null;
  }

  move(vector: Vector3, transform: Vector3, duration = 1, delay = 0) {
    const x = transform.x;
    const y = transform.y;
    const z = transform.z;
    gsap.to(vector, { duration, delay, x, y, z });
  }
}
