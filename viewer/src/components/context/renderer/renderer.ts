import { Camera, Vector2, WebGLRenderer } from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { IfcComponent } from '../../../base-types';
import { Postproduction } from './postproduction';
import { IfcContext } from '../context';

export class IfcRenderer extends IfcComponent {
  renderer: WebGLRenderer;
  renderer2D = new CSS2DRenderer();
  postProduction: Postproduction;
  tempCanvas?: HTMLCanvasElement;
  tempRenderer?: WebGLRenderer;

  blocked = false;

  private readonly container: HTMLElement;
  private readonly context: IfcContext;

  constructor(context: IfcContext) {
    super(context);
    this.context = context;
    this.container = context.options.container;
    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.setupRenderers();
    this.postProduction = new Postproduction(this.context, this.renderer);
    this.adjustRendererSize();
  }

  dispose() {
    this.renderer.domElement.remove();
    this.renderer.dispose();
    this.postProduction.dispose();
    (this.postProduction as any) = null;
    (this.renderer as any) = null;
    (this.renderer2D as any) = null;
    (this.container as any) = null;
    (this.context as any) = null;
    this.tempRenderer?.dispose();
    this.tempCanvas?.remove();
  }

  update(_delta: number) {
    if (this.blocked) return;
    const scene = this.context.getScene();
    const camera = this.context.getCamera();
    this.renderer.render(scene, camera);
    this.renderer2D.render(scene, camera);
  }

  getSize() {
    return new Vector2(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
  }

  adjustRendererSize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.renderer.setSize(width, height);
    this.postProduction.setSize(width, height);
    this.renderer2D.setSize(width, height);
  }

  newScreenshot(camera?: Camera, dimensions?: Vector2) {
    const previousDimensions = this.getSize();

    const domElement = this.renderer.domElement;
    const tempCanvas = domElement.cloneNode(true) as HTMLCanvasElement;

    // Using a new renderer to make screenshots without updating what the user sees in the canvas
    if (!this.tempRenderer) {
      this.tempRenderer = new WebGLRenderer({ canvas: tempCanvas, antialias: true });
      this.tempRenderer.localClippingEnabled = true;
    }

    if (dimensions) {
      this.tempRenderer.setSize(dimensions.x, dimensions.y);
      this.context.ifcCamera.updateAspect(dimensions);
    }

    // todo add this later to have a centered screenshot
    // await this.context.getIfcCamera().currentNavMode.fitModelToFrame();

    const scene = this.context.getScene();
    const cameraToRender = camera || this.context.getCamera();
    this.tempRenderer.render(scene, cameraToRender);
    const result = this.tempRenderer.domElement.toDataURL();

    if (dimensions) this.context.ifcCamera.updateAspect(previousDimensions);

    return result;
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
