import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  NormalPass,
  RenderPass,
  SSAOEffect
  // @ts-ignore
} from 'postprocessing';
import { Camera, Scene, WebGLRenderer } from 'three';
import { IfcEvent } from '../ifcEvent';
import { Context } from '../../../base-types';

export class IfcPostproduction {
  ssaoEffect: any;
  renderer: WebGLRenderer;

  composer: any;

  constructor(private context: Context, canvas: HTMLElement) {
    this.setupEvents();

    this.renderer = new WebGLRenderer({
      canvas,
      powerPreference: 'high-performance',
      antialias: false,
      stencil: false,
      depth: false
    });

    this.renderer.localClippingEnabled = true;
    this.composer = new EffectComposer(this.renderer);
  }

  get domElement() {
    return this.renderer.domElement;
  }

  render() {
    this.composer.render();
  }

  setSize(width: number, height: number) {
    this.composer.setSize(width, height);
  }

  private setupEvents() {
    const createPasses = (scene: Scene, camera: Camera) => {
      const normalPass = new NormalPass(scene, camera, {
        resolutionScale: 1.0
      });

      this.ssaoEffect = new SSAOEffect(camera, normalPass.renderTarget.texture, {
        blendFunction: BlendFunction.MULTIPLY,
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

      const renderPass = new RenderPass(scene, camera);
      const effectPass = new EffectPass(camera, this.ssaoEffect);
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
