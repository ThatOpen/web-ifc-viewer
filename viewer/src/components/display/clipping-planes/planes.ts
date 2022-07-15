import {
  CylinderGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Plane,
  PlaneGeometry,
  Vector3
} from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { IfcComponent } from '../../../base-types';
import { ClippingEdges } from './clipping-edges';
import { IfcContext } from '../../context';

export class IfcPlane extends IfcComponent {
  static planeMaterial = IfcPlane.getPlaneMaterial();
  private static hiddenMaterial = IfcPlane.getHiddenMaterial();
  readonly arrowBoundingBox = new Mesh();
  readonly plane: Plane;
  readonly planeMesh: Mesh;

  isVisible = true;
  enabled = true;
  edgesActive = true;

  // Wether this plane is a section or floor plan
  isPlan = false;

  readonly controls: TransformControls;
  readonly edges: ClippingEdges;
  readonly normal: Vector3;
  readonly origin: Vector3;
  readonly helper: Object3D;

  private readonly planeSize: number;
  private readonly context: IfcContext;

  constructor(
    context: IfcContext,
    origin: Vector3,
    normal: Vector3,
    onStartDragging: Function,
    onEndDragging: Function,
    planeSize: number,
    edgesEnabled: boolean
  ) {
    super(context);
    this.planeSize = planeSize;
    this.context = context;
    this.plane = new Plane();
    this.planeMesh = this.getPlaneMesh();
    this.normal = normal;
    this.origin = origin;
    this.helper = this.createHelper();
    this.controls = this.newTransformControls();
    this.setupEvents(onStartDragging, onEndDragging);
    this.plane.setFromNormalAndCoplanarPoint(normal, origin);

    this.edges = new ClippingEdges(this.plane);
    this.edgesActive = edgesEnabled;
  }

  get active() {
    return this.enabled;
  }

  set active(state: boolean) {
    this.enabled = state;
    const planes = this.context.getClippingPlanes();
    this.edges.visible = state;
    if (state) {
      planes.push(this.plane);
    } else {
      const index = planes.indexOf(this.plane);
      if (index >= 0) planes.splice(index);
    }
  }

  get visible() {
    return this.isVisible;
  }

  set visible(state: boolean) {
    this.isVisible = state;
    this.controls.visible = state;
    this.helper.visible = state;
    this.edges.visible = state;
  }

  dispose() {
    if (IfcPlane.planeMaterial) {
      IfcPlane.planeMaterial.dispose();
      (IfcPlane.planeMaterial as any) = null;
      IfcPlane.planeMaterial = IfcPlane.getPlaneMaterial();
    }
    if (IfcPlane.hiddenMaterial) {
      IfcPlane.hiddenMaterial.dispose();
      (IfcPlane.hiddenMaterial as any) = null;
      IfcPlane.hiddenMaterial = IfcPlane.getHiddenMaterial();
    }
    this.removeFromScene();
    this.edges.disposeStylesAndHelpers();
    (this.edges as any) = null;
    (this.context as any) = null;
  }

  removeFromScene = () => {
    this.helper.removeFromParent();

    this.arrowBoundingBox.removeFromParent();
    this.arrowBoundingBox.geometry.dispose();
    (this.arrowBoundingBox as any) = undefined;

    this.planeMesh.geometry.dispose();
    (this.planeMesh.geometry as any) = undefined;

    this.controls.removeFromParent();
    this.controls.dispose();
    this.edges.dispose();

    this.helper.removeFromParent();
  };

  private static getPlaneMaterial() {
    return new MeshBasicMaterial({
      color: 0xffff00,
      side: DoubleSide,
      transparent: true,
      opacity: 0.2
    });
  }

  private static getHiddenMaterial() {
    return new MeshBasicMaterial({ visible: false });
  }

  private newTransformControls() {
    const camera = this.context.getCamera();
    const container = this.context.getDomElement();
    const controls = new TransformControls(camera, container);
    this.initializeControls(controls);
    const scene = this.context.getScene();
    scene.add(controls);
    this.context.renderer.postProduction.excludedItems.add(controls);
    return controls;
  }

  private initializeControls(controls: TransformControls) {
    controls.attach(this.helper);
    controls.showX = false;
    controls.showY = false;
    controls.setSpace('local');
    this.createArrowBoundingBox();
    controls.children[0].children[0].add(this.arrowBoundingBox);
  }

  private createArrowBoundingBox() {
    this.arrowBoundingBox.geometry = new CylinderGeometry(0.18, 0.18, 1.2);
    this.arrowBoundingBox.material = IfcPlane.hiddenMaterial;
    this.arrowBoundingBox.rotateX(Math.PI / 2);
    this.arrowBoundingBox.updateMatrix();
    this.arrowBoundingBox.geometry.applyMatrix4(this.arrowBoundingBox.matrix);
  }

  private setupEvents(onStart: Function, onEnd: Function) {
    this.controls.addEventListener('change', () => {
      if (!this.enabled) return;
      this.plane.setFromNormalAndCoplanarPoint(this.normal, this.helper.position);
      if (this.edgesActive) this.edges.updateEdges();
    });

    this.controls.addEventListener('dragging-changed', (event) => {
      if (!this.enabled) return;
      this.isVisible = !event.value;
      this.context.toggleCameraControls(this.isVisible);
      if (event.value) onStart();
      else onEnd();
    });

    this.context.ifcCamera.currentNavMode.onChangeProjection.on((camera) => {
      this.controls.camera = camera;
    });
  }

  private createHelper() {
    const helper = new Object3D();
    helper.lookAt(this.normal);
    helper.position.copy(this.origin);
    const scene = this.context.getScene();
    scene.add(helper);
    helper.add(this.planeMesh);
    this.context.renderer.postProduction.excludedItems.add(helper);
    return helper;
  }

  private getPlaneMesh() {
    const planeGeom = new PlaneGeometry(this.planeSize, this.planeSize, 1);
    return new Mesh(planeGeom, IfcPlane.planeMaterial);
  }
}
