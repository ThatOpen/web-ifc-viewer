import { Vector2 } from 'three';

export class IfcMouse {
  position = new Vector2();
  rawPosition = new Vector2();

  constructor(domElement: HTMLCanvasElement) {
    this.setupMousePositionUpdate(domElement);
  }

  private setupMousePositionUpdate(domElement: HTMLCanvasElement) {
    domElement.onmousemove = (event: MouseEvent) => {
      this.rawPosition.x = event.clientX;
      this.rawPosition.y = event.clientY;
      const bounds = domElement.getBoundingClientRect();
      this.position.x = ((event.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
      this.position.y = -((event.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;
    };
  }
}
