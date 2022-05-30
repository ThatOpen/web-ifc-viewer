import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { Camera, Scene, WebGLRenderer } from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
import { IfcContext } from '../context';

export class Postproduction {
  composer: EffectComposer;
  fxaaPass = new ShaderPass(FXAAShader);
  renderPass?: RenderPass;
  saoPass?: SAOPass;
  outlineEffect: OutlineEffect;
  scene?: Scene;
  camera?: Camera;

  active = false;
  activeLayers = {
    ao: false,
    outline: true
  };

  private aoInitialized = false;

  constructor(private context: IfcContext, renderer: WebGLRenderer) {
    this.composer = new EffectComposer(renderer);
    this.composer.renderer.autoClear = false;
    this.outlineEffect = new OutlineEffect(renderer, {
      defaultThickness: 0.003,
      defaultColor: [0, 0, 0],
      defaultAlpha: 1,
      defaultKeepAlive: true
    });
    this.outlineEffect.setPixelRatio(1);
  }

  dispose() {}

  render() {
    if (!this.scene) this.scene = this.context.getScene();
    if (!this.camera) this.camera = this.context.getCamera();
    if (!this.scene || !this.camera) return;

    if (this.activeLayers.outline) {
      this.outlineEffect.render(this.scene, this.camera);
    }

    if (this.activeLayers.ao) {
      if (!this.aoInitialized) this.initializeAmbientOclussionPasses();
      this.composer.render();
    }
  }

  setSize(width: number, height: number) {
    this.composer.setSize(width, height);
    this.outlineEffect.setSize(width, height);
  }

  private initializeAmbientOclussionPasses() {
    this.renderPass = new RenderPass(this.scene!, this.camera!);
    this.saoPass = new SAOPass(this.scene!, this.camera!, false, true);
    this.saoPass.enabled = true;
    this.saoPass.params.saoIntensity = 0.02;
    this.saoPass.params.saoBias = 0.5;
    this.saoPass.params.saoBlurRadius = 8;
    this.saoPass.params.saoBlurDepthCutoff = 0.0015;
    this.saoPass.params.saoScale = 50;
    this.saoPass.params.saoKernelRadius = 50;
    this.aoInitialized = true;

    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.fxaaPass);
    this.composer.addPass(this.saoPass);
  }
}
