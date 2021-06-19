import { Vector2, WebGLRenderer } from 'three';
import { Component, ViewerOptions } from '../../base-types';

export class IfcRenderer extends Component {
  renderer: WebGLRenderer;
  container: HTMLElement;
  mouse: Vector2;

  constructor(options: ViewerOptions) {
    super();
    this.container = options.container;
    this.renderer = new WebGLRenderer({ antialias: true });
    this.mouse = new Vector2();
    this.setupRenderer();
    this.adjustRendererSize();
  }

  getSize() {
    return new Vector2(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
  }

  setSize(x: number, y: number) {
    this.renderer.setSize(x, y);
  }

  private setupRenderer() {
    this.renderer.localClippingEnabled = true;
    this.container.appendChild(this.renderer.domElement);
  }

  adjustRendererSize() {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}
