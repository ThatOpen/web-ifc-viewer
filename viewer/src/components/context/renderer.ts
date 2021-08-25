import { Vector2, WebGLRenderer } from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { IfcComponent, Context } from '../../base-types';

export class IfcRenderer extends IfcComponent {
  renderer = new WebGLRenderer({ antialias: true });
  renderer2D = new CSS2DRenderer();
  private readonly container: HTMLElement;
  private readonly context: Context;

  constructor(context: Context) {
    super(context);
    this.context = context;
    this.container = context.options.container;
    this.setupRenderers();
    this.adjustRendererSize();
  }

  update(_delta: number) {
    const scene = this.context.getScene();
    const camera = this.context.getCamera();
    this.renderer.render(scene, camera);
    this.renderer2D.render(scene, camera);
  }

  getSize() {
    return new Vector2(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
  }

  adjustRendererSize() {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer2D.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  private setupRenderers() {
    this.renderer.localClippingEnabled = true;
    this.container.appendChild(this.renderer.domElement);

    this.renderer2D.domElement.style.position = 'absolute';
    this.renderer2D.domElement.style.top = '0px';
    this.renderer2D.domElement.style.pointerEvents = 'none';
    this.container.appendChild(this.renderer2D.domElement);
  }
}
