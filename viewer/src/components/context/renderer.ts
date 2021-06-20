import { Vector2, WebGLRenderer } from 'three';
import { IfcComponent, Context } from '../../base-types';

export class IfcRenderer extends IfcComponent {
  renderer: WebGLRenderer;
  private readonly container: HTMLElement;
  private readonly context: Context;

  constructor(context: Context) {
    super(context);
    this.context = context;
    this.container = context.options.container;
    this.renderer = new WebGLRenderer({ antialias: true });
    this.setupRenderer();
    this.adjustRendererSize();
  }

  update(_delta: number) {
    const scene = this.context.getScene();
    const camera = this.context.getCamera();
    this.renderer.render(scene, camera);
  }

  getSize() {
    return new Vector2(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
  }

  adjustRendererSize() {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  private setupRenderer() {
    this.renderer.localClippingEnabled = true;
    this.container.appendChild(this.renderer.domElement);
  }
}
