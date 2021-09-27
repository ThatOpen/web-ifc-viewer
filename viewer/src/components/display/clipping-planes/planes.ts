import {
  Object3D,
  PlaneGeometry,
  Vector3,
  Plane,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  CylinderGeometry
} from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { IfcComponent, Context } from '../../../base-types';

export class IfcPlane extends IfcComponent {
  readonly arrowBoundingBox = new Mesh();
  readonly plane: Plane;
  readonly planeMesh: Mesh;
  visible: boolean;

  private static hiddenMaterial = new MeshBasicMaterial({ visible: false });
  static planeMaterial = new MeshBasicMaterial({
    color: 0xffff00,
    side: DoubleSide,
    transparent: true,
    opacity: 0.2
  });
  readonly controls: TransformControls;
  private readonly normal: Vector3;
  private readonly origin: Vector3;
  private readonly helper: Object3D;
  private readonly planeSize: number;
  private context: Context;

  constructor(
    context: Context,
    origin: Vector3,
    normal: Vector3,
    onStartDragging: Function,
    onEndDragging: Function,
    planeSize: number
  ) {
    super(context);
    this.planeSize = planeSize;
    this.context = context;
    this.plane = new Plane();
    this.planeMesh = this.getPlaneMesh();
    this.visible = true;
    this.normal = normal;
    this.origin = origin;
    this.helper = this.createHelper();
    this.controls = this.newTransformControls();
    this.setupEvents(onStartDragging, onEndDragging);
    this.plane.setFromNormalAndCoplanarPoint(normal.negate(), origin);
  }

  setVisibility(visible: boolean) {
    this.visible = visible;
    this.helper.visible = visible;
    this.controls.visible = visible;
  }

  removeFromScene = () => {
    const scene = this.context.getScene();
    scene.remove(this.helper);
    scene.remove(this.controls);
  };

  private newTransformControls() {
    const camera = this.context.getCamera();
    const container = this.context.getDomElement();
    const controls = new TransformControls(camera, container);
    this.initializeControls(controls);
    const scene = this.context.getScene();
    scene.add(controls);
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
      this.plane.setFromNormalAndCoplanarPoint(this.normal, this.helper.position);
    });
    this.controls.addEventListener('dragging-changed', (event) => {
      this.visible = !event.value;
      this.context.toggleCameraControls(this.visible);
      if (event.value) onStart();
      else onEnd();
    });
  }

  private createHelper() {
    const helper = new Object3D();
    helper.lookAt(this.normal);
    helper.position.copy(this.origin);
    const scene = this.context.getScene();
    scene.add(helper);
    helper.add(this.planeMesh);
    return helper;
  }

  private getPlaneMesh() {
    const planeGeom = new PlaneGeometry(this.planeSize, this.planeSize, 1);
    return new Mesh(planeGeom, IfcPlane.planeMaterial);
  }
}
