import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import {
  Camera,
  Color,
  DepthTexture,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget
} from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { IfcContext } from '../context';
import { CustomOutlinePass } from './custom-outline-pass';

// source: https://discourse.threejs.org/t/how-to-render-full-outlines-as-a-post-process-tutorial/22674

export class Postproduction {
  htmlOverlay = document.createElement('img');
  excludedItems = new Set<Object3D>();

  private initialized = false;

  private saoPass?: SAOPass;
  private fxaaPass?: ShaderPass;
  private basePass?: RenderPass;
  private customOutline?: CustomOutlinePass;
  private outlineUniforms: any;
  private depthTexture?: DepthTexture;
  private readonly composer: EffectComposer;
  private readonly renderTarget: WebGLRenderTarget;
  private readonly visibilityField = 'ifcjsPostproductionVisible';

  private isUserControllingCamera = false;
  private isControlSleeping = true;
  private lastWheelUsed = 0;
  private lastResized = 0;
  private resizeDelay = 500;

  private isActive = false;
  private isVisible = false;

  private scene?: Scene;
  private white = new Color(255, 255, 255);

  private tempMaterial = new MeshLambertMaterial({
    colorWrite: false,
    opacity: 0,
    transparent: true
  });

  private outlineParams = {
    mode: { Mode: 0 },
    FXAA: true,
    outlineColor: 0x777777,
    depthBias: 16,
    depthMult: 83,
    normalBias: 5,
    normalMult: 1.0
  };

  get active() {
    return this.isActive;
  }

  set active(active: boolean) {
    if (this.isActive === active) return;
    if (!this.initialized) this.tryToInitialize();
    this.visible = active;
    this.isActive = active;
  }

  get visible() {
    return this.isVisible;
  }

  set visible(visible: boolean) {
    if (!this.isActive) return;
    this.isVisible = visible;
    if (visible) this.update();
    this.htmlOverlay.style.visibility = visible ? 'visible' : 'collapse';
  }

  get outlineColor() {
    return this.outlineParams.outlineColor;
  }

  set outlineColor(color: number) {
    this.outlineParams.outlineColor = color;
    this.outlineUniforms.outlineColor.value.set(color);
  }

  get sao() {
    return this.saoPass?.params;
  }

  constructor(private context: IfcContext, private renderer: WebGLRenderer) {
    this.renderTarget = this.newRenderTarget();

    this.composer = new EffectComposer(renderer, this.renderTarget);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  dispose() {
    this.active = false;

    window.removeEventListener('resize', this.onResize);

    this.renderTarget.dispose();
    (this.renderTarget as any) = null;

    this.depthTexture?.dispose();
    (this.depthTexture as any) = null;

    this.customOutline?.dispose();
    (this.customOutline as any) = null;

    (this.composer as any) = null;

    this.excludedItems.clear();
    (this.excludedItems as any) = null;

    (this.composer as any) = null;

    this.htmlOverlay.remove();
    (this.htmlOverlay as any) = null;

    (this.outlineParams as any) = null;

    (this.context as any) = null;
    (this.renderer as any) = null;

    (this.saoPass as any) = null;
    (this.outlineUniforms as any) = null;

    (this.scene as any) = null;
  }

  setSize(width: number, height: number) {
    this.composer.setSize(width, height);
  }

  update() {
    if (!this.initialized || !this.isActive) return;

    this.hideExcludedItems();

    this.context.getScene().traverse((object) => {
      // @ts-ignore
      object.userData.prevMaterial = object.material;
      // @ts-ignore
      object.material = this.tempMaterial;
    });

    const background = this.scene?.background;
    if (this.scene?.background && background) this.scene.background = this.white;

    this.composer.render();

    if (this.scene?.background && background) this.scene.background = background;

    this.context.getScene().traverse((object) => {
      // @ts-ignore
      object.material = object.userData.prevMaterial;
      delete object.userData.prevMaterial;
    });

    this.htmlOverlay.src = this.renderer.domElement.toDataURL();
    this.showExcludedItems();
  }

  private hideExcludedItems() {
    for (const object of this.excludedItems) {
      object.userData[this.visibilityField] = object.visible;
      object.visible = false;
    }
  }

  private showExcludedItems() {
    for (const object of this.excludedItems) {
      if (object.userData[this.visibilityField] !== undefined) {
        object.visible = object.userData[this.visibilityField];
      }
    }
  }

  private tryToInitialize() {
    const scene = this.context.getScene();
    const camera = this.context.getCamera() as PerspectiveCamera;
    if (!scene || !camera) return;

    this.scene = scene;
    this.renderer.clippingPlanes = this.context.getClippingPlanes();
    this.setupEvents();

    this.addBasePass(scene, camera);
    this.addSaoPass(scene, camera);
    this.addOutlinePass(scene, camera);
    this.addAntialiasPass();
    this.setupHtmlOverlay();

    this.initialized = true;
  }

  private setupEvents() {
    const controls = this.context.ifcCamera.cameraControls;
    const domElement = this.context.getDomElement();
    controls.addEventListener('control', this.onControl);
    controls.addEventListener('controlstart', this.onControlStart);
    controls.addEventListener('wake', this.onWake);
    controls.addEventListener('controlend', this.onControlEnd);
    domElement.addEventListener('wheel', this.onWheel);
    controls.addEventListener('sleep', this.onSleep);
    window.addEventListener('resize', this.onResize);
    this.context.ifcCamera.onChangeProjection.on(this.onChangeProjection);
  }

  private onControlStart = () => (this.isUserControllingCamera = true);
  private onWake = () => (this.isControlSleeping = false);

  private onResize = () => {
    this.lastResized = performance.now();
    this.visible = false;

    setTimeout(() => {
      if (performance.now() - this.lastResized >= this.resizeDelay) {
        this.visible = true;
      }
    }, this.resizeDelay);
  };

  private onControl = () => {
    this.visible = false;
  };

  private onControlEnd = () => {
    this.isUserControllingCamera = false;
    if (!this.isUserControllingCamera && this.isControlSleeping) {
      this.visible = true;
    }
  };

  private onWheel = () => {
    this.lastWheelUsed = performance.now();
  };

  private onSleep = () => {
    // This prevents that this gets triggered a million times when zooming with the wheel
    this.isControlSleeping = true;
    const currentWheel = performance.now();
    setTimeout(() => {
      if (this.lastWheelUsed > currentWheel) return;
      if (!this.isUserControllingCamera && this.isControlSleeping) {
        this.visible = true;
      }
    }, 200);
  };

  private onChangeProjection = (camera: Camera) => {
    this.composer.passes.forEach((pass) => {
      // @ts-ignore
      pass.camera = camera;
    });
    this.update();
  };

  private setupHtmlOverlay() {
    this.context.getContainerElement().appendChild(this.htmlOverlay);
    // @ts-ignore
    this.htmlOverlay.style.mixBlendMode = 'multiply';
    this.htmlOverlay.style.position = 'absolute';
    this.htmlOverlay.style.height = '100%';
    this.htmlOverlay.style.userSelect = 'none';
    this.htmlOverlay.style.pointerEvents = 'none';
    this.htmlOverlay.style.top = '0';
    this.htmlOverlay.style.left = '0';
  }

  private addAntialiasPass() {
    this.fxaaPass = new ShaderPass(FXAAShader);
    this.fxaaPass.uniforms.resolution.value.set(
      (1 / this.renderer.domElement.offsetWidth) * this.renderer.getPixelRatio(),
      (1 / this.renderer.domElement.offsetHeight) * this.renderer.getPixelRatio()
    );
    this.composer.addPass(this.fxaaPass);
  }

  private addOutlinePass(scene: Scene, camera: PerspectiveCamera) {
    this.customOutline = new CustomOutlinePass(
      new Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );

    // Initial values
    // @ts-ignore
    this.outlineUniforms = this.customOutline.fsQuad.material.uniforms;
    this.outlineUniforms.outlineColor.value.set(this.outlineParams.outlineColor);
    this.outlineUniforms.multiplierParameters.value.x = this.outlineParams.depthBias;
    this.outlineUniforms.multiplierParameters.value.y = this.outlineParams.depthMult;
    this.outlineUniforms.multiplierParameters.value.z = this.outlineParams.normalBias;
    this.outlineUniforms.multiplierParameters.value.w = this.outlineParams.normalMult;

    this.composer.addPass(this.customOutline);
  }

  private addSaoPass(scene: Scene, camera: PerspectiveCamera) {
    this.saoPass = new SAOPass(scene, camera, false, true);
    this.composer.addPass(this.saoPass);

    this.saoPass.enabled = true;
    this.saoPass.params.saoIntensity = 0.01;
    this.saoPass.params.saoBias = 0.5;
    this.saoPass.params.saoBlurRadius = 8;
    this.saoPass.params.saoBlurDepthCutoff = 0.0015;
    this.saoPass.params.saoScale = 30;
    this.saoPass.params.saoKernelRadius = 30;
  }

  private addBasePass(scene: Scene, camera: PerspectiveCamera) {
    this.basePass = new RenderPass(scene, camera);
    this.composer.addPass(this.basePass);
  }

  private newRenderTarget() {
    this.depthTexture = new DepthTexture(window.innerWidth, window.innerHeight);
    return new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      depthTexture: this.depthTexture,
      depthBuffer: true
    });
  }
}
