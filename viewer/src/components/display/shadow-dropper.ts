import {
  BufferAttribute,
  BufferGeometry,
  Camera,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget
} from 'three';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader';
import { Context } from '../../base-types';
import { IfcManager } from '../ifc';

export interface Shadow {
  root: Group;
  rt: WebGLRenderTarget;
  rtBlur: WebGLRenderTarget;
  blurPlane: Mesh;
  camera: Camera;
}

export class ShadowDropper {
  shadows: { [modelID: number]: Shadow } = {};

  // Controls how far away the shadow is computed
  cameraHeight = 10;

  darkness = 1.2;
  opacity = 1;
  resolution = 512;
  amount = 3.5;

  private tempMaterial = new MeshBasicMaterial({ visible: false });
  private depthMaterial = new MeshDepthMaterial();

  private context: Context;
  private IFC: IfcManager;

  constructor(context: Context, IFC: IfcManager) {
    this.context = context;
    this.IFC = IFC;
    this.initializeDepthMaterial();
  }

  async renderShadow(modelID: number) {
    const { size, center } = this.getSizeAndCenter(modelID);
    const scene = this.context.getScene();
    const shadow = this.createShadow(modelID, size);
    await this.initializeShadow(modelID, shadow, scene, center);
    this.createPlanes(shadow, size);
    this.bakeShadow(modelID, shadow, scene);
  }

  private createPlanes(currentShadow: Shadow, size: Vector3) {
    const planeGeometry = new PlaneGeometry(size.x, size.z).rotateX(Math.PI / 2);
    this.createBasePlane(currentShadow, planeGeometry);
    this.createBlurPlane(currentShadow, planeGeometry);
    this.createGroundColorPlane(currentShadow, planeGeometry);
  }

  private async initializeShadow(modelID: number, shadow: Shadow, scene: Scene, center: Vector3) {
    await this.initializeRoot(modelID, shadow, scene, center);
    this.initializeRenderTargets(shadow);
    this.initializeCamera(shadow);
  }

  private bakeShadow(modelID: number, shadow: Shadow, scene: Scene) {
    const model = this.context.items.ifcModels[modelID];
    const children = scene.children.filter((obj) => obj !== model && obj !== shadow.root);

    for (let i = children.length - 1; i >= 0; i--) {
      scene.remove(children[i]);
    }

    // remove the background
    const initialBackground = scene.background;
    scene.background = null;

    // force the depthMaterial to everything
    scene.overrideMaterial = this.depthMaterial;

    // render to the render target to get the depths
    const renderer = this.context.getRenderer() as WebGLRenderer;
    renderer.setRenderTarget(shadow.rt);
    renderer.render(scene, shadow.camera);

    // and reset the override material
    scene.overrideMaterial = null;

    this.blurShadow(shadow, this.amount);
    // a second pass to reduce the artifacts
    // (0.4 is the minimum blur amount so that the artifacts are gone)
    this.blurShadow(shadow, this.amount * 0.4);

    // reset and render the normal scene
    renderer.setRenderTarget(null);
    scene.background = initialBackground;

    for (let i = children.length - 1; i >= 0; i--) {
      scene.add(children[i]);
    }
  }

  private initializeCamera(shadow: Shadow) {
    shadow.camera.rotation.x = Math.PI / 2; // get the camera to look up
    shadow.root.add(shadow.camera);
  }

  private initializeRenderTargets(shadow: Shadow) {
    shadow.rt.texture.generateMipmaps = false;
    shadow.rtBlur.texture.generateMipmaps = false;
  }

  private async initializeRoot(modelID: number, shadow: Shadow, scene: Scene, center: Vector3) {
    const minPosition = await this.getLowestYCoordinate(modelID);
    shadow.root.position.set(center.x, minPosition - 0.1, center.z);
    scene.add(shadow.root);
  }

  private createGroundColorPlane(shadow: Shadow, planeGeometry: BufferGeometry) {
    const fillPlaneMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      opacity: this.opacity,
      transparent: true,
      depthWrite: false,
      clippingPlanes: this.context.getClippingPlanes()
    });
    const fillPlane = new Mesh(planeGeometry, fillPlaneMaterial);
    fillPlane.rotateX(Math.PI);
    fillPlane.renderOrder = -1;
    shadow.root.add(fillPlane);
  }

  private createBasePlane(shadow: Shadow, planeGeometry: BufferGeometry) {
    const planeMaterial = this.createPlaneMaterial(shadow);
    const plane = new Mesh(planeGeometry, planeMaterial);
    // make sure it's rendered after the fillPlane
    plane.renderOrder = 0;
    shadow.root.add(plane);
    // the y from the texture is flipped!
    plane.scale.y = -1;
  }

  private createBlurPlane(shadow: Shadow, planeGeometry: BufferGeometry) {
    shadow.blurPlane.geometry = planeGeometry;
    shadow.blurPlane.visible = false;
    shadow.root.add(shadow.blurPlane);
  }

  private createPlaneMaterial(shadow: Shadow) {
    return new MeshBasicMaterial({
      map: shadow.rt.texture,
      opacity: this.opacity,
      transparent: true,
      depthWrite: false,
      clippingPlanes: this.context.getClippingPlanes()
    });
  }

  // like MeshDepthMaterial, but goes from black to transparent
  private initializeDepthMaterial() {
    this.depthMaterial.depthTest = false;
    this.depthMaterial.depthWrite = false;
    const oldShader = 'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );';
    const newShader = 'gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );';
    this.depthMaterial.userData.darkness = { value: this.darkness };
    this.depthMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.darkness = this.depthMaterial.userData.darkness;
      shader.fragmentShader = /* glsl */ `
						uniform float darkness;
						${shader.fragmentShader.replace(oldShader, newShader)}
					`;
    };
  }

  private createShadow(modelID: number, size: Vector3) {
    this.shadows[modelID] = {
      root: new Group(),
      rt: new WebGLRenderTarget(this.resolution, this.resolution),
      rtBlur: new WebGLRenderTarget(this.resolution, this.resolution),
      blurPlane: new Mesh(),
      camera: this.createCamera(size)
    };
    return this.shadows[modelID];
  }

  private createCamera(size: Vector3) {
    return new OrthographicCamera(
      -size.x / 2,
      size.x / 2,
      size.z / 2,
      -size.z / 2,
      0,
      this.cameraHeight
    );
  }

  private getSizeAndCenter(modelID: number) {
    const geometry = this.context.items.ifcModels[modelID].geometry;
    geometry.computeBoundingBox();
    if (geometry.boundingBox) {
      const size = new Vector3();
      geometry.boundingBox.getSize(size);
      size.x *= 1.5;
      size.z *= 1.5;
      const center = new Vector3();
      geometry.boundingBox.getCenter(center);
      return { size, center };
    }
    throw new Error(`Bounding box could not be computed for model ${modelID}`);
  }

  private async getLowestYCoordinate(modelID: number) {
    const mesh = this.context.items.ifcModels[modelID];
    const indices = mesh.geometry.index as BufferAttribute;
    const position = mesh.geometry.attributes.position;
    let minPosition = Number.MAX_VALUE;
    for (let i = 0; i <= indices.count; i++) {
      const current = position.getY(indices.array[i]);
      if (current < minPosition) minPosition = current;
    }
    this.IFC.loader.ifcManager.removeSubset(modelID, this.tempMaterial);
    return minPosition;
  }

  private blurShadow(shadow: Shadow, amount: number) {
    const horizontalBlurMaterial = new ShaderMaterial(HorizontalBlurShader);
    horizontalBlurMaterial.depthTest = false;

    const verticalBlurMaterial = new ShaderMaterial(VerticalBlurShader);
    verticalBlurMaterial.depthTest = false;

    shadow.blurPlane.visible = true;

    // blur horizontally and draw in the renderTargetBlur
    shadow.blurPlane.material = horizontalBlurMaterial;
    // @ts-ignore
    shadow.blurPlane.material.uniforms.tDiffuse.value = shadow.rt.texture;
    horizontalBlurMaterial.uniforms.h.value = (amount * 1) / 256;

    const renderer = this.context.getRenderer() as WebGLRenderer;
    renderer.setRenderTarget(shadow.rtBlur);
    renderer.render(shadow.blurPlane, shadow.camera);

    // blur vertically and draw in the main renderTarget
    shadow.blurPlane.material = verticalBlurMaterial;
    // @ts-ignore
    shadow.blurPlane.material.uniforms.tDiffuse.value = shadow.rtBlur.texture;
    verticalBlurMaterial.uniforms.v.value = (amount * 1) / 256;

    renderer.setRenderTarget(shadow.rt);
    renderer.render(shadow.blurPlane, shadow.camera);

    shadow.blurPlane.visible = false;
  }
}
