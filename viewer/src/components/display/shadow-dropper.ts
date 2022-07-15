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
import { IfcManager } from '../ifc';
import { IfcContext } from '../context';
import { disposeMeshRecursively } from '../../utils/ThreeUtils';

export interface Shadow {
  root: Group;
  rt: WebGLRenderTarget;
  rtBlur: WebGLRenderTarget;
  blurPlane: Mesh;
  camera: Camera;
}

export class ShadowDropper {
  shadows: { [id: string]: Shadow } = {};

  // Controls how far away the shadow is computed
  cameraHeight = 10;

  darkness = 1.2;
  opacity = 1;
  resolution = 512;
  amount = 3.5;
  planeColor = 0xffffff;
  shadowOffset = 0;

  private tempMaterial = new MeshBasicMaterial({ visible: false });
  private depthMaterial = new MeshDepthMaterial();

  private context: IfcContext;
  private IFC: IfcManager;

  constructor(context: IfcContext, IFC: IfcManager) {
    this.context = context;
    this.IFC = IFC;
    this.initializeDepthMaterial();
  }

  dispose() {
    const shadowIDs = Object.keys(this.shadows);
    shadowIDs.forEach((shadowID) => this.deleteShadow(shadowID));
    (this.shadows as any) = null;
    this.tempMaterial.dispose();
    (this.tempMaterial as any) = null;
    this.depthMaterial.dispose();
    (this.depthMaterial as any) = null;
    (this.context as any) = null;
    (this.IFC as any) = null;
  }

  async renderShadow(modelID: number) {
    const model = this.context.items.ifcModels.find((model) => model.modelID === modelID);
    if (!model) throw new Error('The requested model was not found.');
    await this.renderShadowOfMesh(model, `${model.modelID}`);
  }

  renderShadowOfMesh(model: Mesh, id = model.uuid) {
    if (this.shadows[id]) throw new Error(`There is already a shadow with ID ${id}`);
    const { size, center } = this.getSizeAndCenter(model);
    const scene = this.context.getScene();
    const shadow = this.createShadow(id, size);
    this.initializeShadow(model, shadow, scene, center);
    this.createPlanes(shadow, size);
    this.bakeShadow(model, shadow, scene);
    this.context.renderer.postProduction.excludedItems.add(shadow.root);
  }

  deleteShadow(id: string) {
    const shadow = this.shadows[id];
    delete this.shadows[id];
    if (!shadow) throw new Error(`No shadow with ID ${id} was found.`);
    disposeMeshRecursively(shadow.root as any);
    disposeMeshRecursively(shadow.blurPlane);
    shadow.rt.dispose();
    shadow.rtBlur.dispose();
  }

  private createPlanes(currentShadow: Shadow, size: Vector3) {
    const planeGeometry = new PlaneGeometry(size.x, size.z).rotateX(Math.PI / 2);
    this.createBasePlane(currentShadow, planeGeometry);
    this.createBlurPlane(currentShadow, planeGeometry);
    // this.createGroundColorPlane(currentShadow, planeGeometry);
  }

  private initializeShadow(model: Mesh, shadow: Shadow, scene: Scene, center: Vector3) {
    this.initializeRoot(model, shadow, scene, center);
    this.initializeRenderTargets(shadow);
    this.initializeCamera(shadow);
  }

  private bakeShadow(model: Mesh, shadow: Shadow, scene: Scene) {
    const isModelInScene = model.parent !== null && model.parent !== undefined;
    if (!isModelInScene) scene.add(model);
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

    if (!isModelInScene) model.removeFromParent();
  }

  private initializeCamera(shadow: Shadow) {
    shadow.camera.rotation.x = Math.PI / 2; // get the camera to look up
    shadow.root.add(shadow.camera);
  }

  private initializeRenderTargets(shadow: Shadow) {
    shadow.rt.texture.generateMipmaps = false;
    shadow.rtBlur.texture.generateMipmaps = false;
  }

  private initializeRoot(model: Mesh, shadow: Shadow, scene: Scene, center: Vector3) {
    const minPosition = this.getLowestYCoordinate(model);
    shadow.root.position.set(center.x, minPosition - this.shadowOffset, center.z);
    scene.add(shadow.root);
  }

  // Plane simulating the "ground". This is not needed for BIM models generally
  // private createGroundColorPlane(_shadow: Shadow, planeGeometry: BufferGeometry) {
  //   const fillPlaneMaterial = new MeshBasicMaterial({
  //     color: this.planeColor,
  //     opacity: this.opacity,
  //     transparent: true,
  //     depthWrite: false,
  //     clippingPlanes: this.context.getClippingPlanes()
  //   });
  //   const fillPlane = new Mesh(planeGeometry, fillPlaneMaterial);
  //   fillPlane.rotateX(Math.PI);
  //   fillPlane.renderOrder = -1;
  //   shadow.root.add(fillPlane);
  // }

  private createBasePlane(shadow: Shadow, planeGeometry: BufferGeometry) {
    const planeMaterial = this.createPlaneMaterial(shadow);
    const plane = new Mesh(planeGeometry, planeMaterial);
    // make sure it's rendered after the fillPlane
    plane.renderOrder = 2;
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

  private createShadow(id: string, size: Vector3) {
    this.shadows[id] = {
      root: new Group(),
      rt: new WebGLRenderTarget(this.resolution, this.resolution),
      rtBlur: new WebGLRenderTarget(this.resolution, this.resolution),
      blurPlane: new Mesh(),
      camera: this.createCamera(size)
    };
    return this.shadows[id];
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

  private getSizeAndCenter(model: Mesh) {
    const geometry = model.geometry;
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
    throw new Error(`Bounding box could not be computed for the mesh ${model.uuid}`);
  }

  private getLowestYCoordinate(model: Mesh) {
    const indices = model.geometry.index as BufferAttribute;
    const position = model.geometry.attributes.position;
    let minPosition = Number.MAX_VALUE;
    for (let i = 0; i <= indices.count; i++) {
      const current = position.getY(indices.array[i]);
      if (current < minPosition) minPosition = current;
    }
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
