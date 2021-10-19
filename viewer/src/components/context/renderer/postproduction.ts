import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  NormalPass,
  RenderPass,
  SSAOEffect
  // @ts-ignore
} from 'postprocessing';
import { WebGLRenderer } from 'three';
import { IfcEvent } from '../ifcEvent';
import { Context } from '../../../base-types';

export class IfcPostproduction {
  composer: EffectComposer;
  ssaoEffect: SSAOEffect;

  constructor(private context: Context, renderer: WebGLRenderer) {
    this.setupEvents();
    this.composer = new EffectComposer(renderer);
  }

  render() {
    this.composer.render();
  }

  setSize(width: number, height: number) {
    this.composer.setSize(width, height);
  }

  private setupEvents() {
    this.context.events.subscribe(IfcEvent.onCameraReady, () => {
      const scene = this.context.getScene();
      const camera = this.context.getCamera();

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

      this.composer.addPass(renderPass);
      this.composer.addPass(normalPass);
      this.composer.addPass(effectPass);

      // this.gui.add(ssaoEffect, 'samples', 1, 32, 1);
      // this.gui.add(ssaoEffect, 'rings', 1, 16, 1);
      // this.gui.add(ssaoEffect, 'radius', 1e-6, 1.0, 0.001);
      // this.gui.add(ssaoEffect, 'distanceScaling').onChange((value) => {
      //   ssaoEffect.distanceScaling = value;
      // });

      // const effects = {
      //   intensity: 0,
      //   bias: 0,
      //   fade: 0,
      //   opacity: 1,
      //   resolution: 0.25
      // }

      // this.gui.add(effects, 'intensity', 0, 10, 0.25).onChange((value) => {
      //   ssaoEffect.ssaoMaterial.uniforms.intensity.value = value;
      // });
      //
      // this.gui.add(effects, 'bias', 0, 1.0, 0.001).onChange((value) => {
      //   ssaoEffect.ssaoMaterial.uniforms.bias.value = value;
      // });
      //
      // this.gui.add(effects, 'fade', 0, 1.0, 0.001).onChange((value) => {
      //   ssaoEffect.ssaoMaterial.uniforms.fade.value = value;
      // });
      //
      // this.gui.add(effects, 'opacity', 0, 3.0, 0.1).onChange((value) => {
      //   ssaoEffect.blendMode.opacity.value = value;
      // });
      //
      // this.gui.add(effects, 'resolution', 0, 3.0, 0.25).onChange((value) => {
      //   ssaoEffect.resolution.scale = value;
      // });
    });
  }
}
