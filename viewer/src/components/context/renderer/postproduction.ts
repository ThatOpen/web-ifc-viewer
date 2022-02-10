import { Camera, Scene, WebGLRenderer } from 'three';
import { IfcEvent } from '../ifcEvent';
import { IfcContext } from '../context';

export class IfcPostproduction {
  ssaoEffect: any;
  renderer: WebGLRenderer;

  composer: any;
  initialized = false;

  private BlendFunction: any;
  private EffectComposer: any;
  private EffectPass: any;
  private NormalPass: any;
  private RenderPass: any;
  private SSAOEffect: any;

  private notInitializedError = 'You have not initialized the postproduction library';

  constructor(private context: IfcContext, canvas: HTMLElement) {
    this.renderer = new WebGLRenderer({
      canvas,
      powerPreference: 'high-performance',
      antialias: false,
      stencil: false,
      depth: false
    });

    this.renderer.localClippingEnabled = true;
  }

  get domElement() {
    return this.renderer.domElement;
  }

  // Depending on this library has given some issues in the past
  // It's better to avoid that dependency and allow users that want to use it to give us this objects instead
  initializePostprocessing(postproduction: {
    BlendFunction: any;
    EffectComposer: any;
    EffectPass: any;
    NormalPass: any;
    RenderPass: any;
    SSAOEffect: any;
  }) {
    this.BlendFunction = postproduction.BlendFunction;
    this.EffectComposer = postproduction.EffectComposer;
    this.EffectPass = postproduction.EffectPass;
    this.NormalPass = postproduction.NormalPass;
    this.RenderPass = postproduction.RenderPass;
    this.SSAOEffect = postproduction.SSAOEffect;
    this.composer = new this.EffectComposer(this.renderer);
    this.setupEvents();
    this.initialized = true;
  }

  render() {
    if (!this.initialized) throw new Error(this.notInitializedError);
    this.composer.render();
  }

  setSize(width: number, height: number) {
    if (!this.initialized) return;
    this.composer.setSize(width, height);
  }

  private setupEvents() {
    const createPasses = (scene: Scene, camera: Camera) => {
      const normalPass = new this.NormalPass(scene, camera, {
        resolutionScale: 1.0
      });

      this.ssaoEffect = new this.SSAOEffect(camera, normalPass.renderTarget.texture, {
        blendFunction: this.BlendFunction.MULTIPLY,
        // blendFunction: POSTPROCESSING.BlendFunction.ALPHA,
        samples: 32,
        rings: 5,
        distanceThreshold: 0.0,
        distanceFalloff: 1.0,
        rangeThreshold: 0.0,
        rangeFalloff: 1.0,
        luminanceInfluence: 0.0,
        scale: 0.6,
        radius: 0.03,
        bias: 0.03,
        intensity: 10.0
      });

      this.ssaoEffect.ssaoMaterial.uniforms.fade.value = 1;
      this.ssaoEffect.resolution.scale = 1.5;
      this.ssaoEffect.blendMode.opacity.value = 1.2;

      // Scale, Bias and Opacity influence intensity.
      this.ssaoEffect.blendMode.opacity.value = 1.0;

      const renderPass = new this.RenderPass(scene, camera);
      const effectPass = new this.EffectPass(camera, this.ssaoEffect);
      effectPass.renderToScreen = true;

      return [renderPass, normalPass, effectPass];
    };

    const setupPasses = (scene: Scene, camera: Camera) => {
      const passes = createPasses(scene, camera);
      passes.forEach((pass) => this.composer.addPass(pass));
    };

    this.context.events.subscribe(IfcEvent.onCameraReady, () => {
      const scene = this.context.getScene();
      const camera = this.context.ifcCamera;

      camera.onChangeProjection.on((camera) => {
        this.composer.removeAllPasses();
        setupPasses(this.context.getScene(), camera);
      });

      setupPasses(scene, camera.activeCamera);
    });
  }
}
