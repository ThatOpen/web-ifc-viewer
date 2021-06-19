import { Renderer, Vector2, WebGLRenderer } from 'three';
import { Component } from '../../base-types';

export class IfcMouse extends Component {
  position: Vector2;

  constructor(renderer: WebGLRenderer) {
    super();
    this.position = new Vector2();
    this.setupMousePositionUpdate(renderer);
  }

  private setupMousePositionUpdate(renderer: Renderer) {
    renderer.domElement.onmousemove = (event: MouseEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      this.position.x = ((event.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
      this.position.y = -((event.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;
    };
  }
}
