import {
  Object3D,
  PlaneGeometry,
  Vector3,
  Plane,
  MeshBasicMaterial,
  DoubleSide,
  Mesh
} from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { IfcComponent, Context } from '../../../base-types';

export class IfcPlane extends IfcComponent {
  plane: Plane;
  planeMesh: Mesh;
  visible: boolean;
  private normal: Vector3;
  private origin: Vector3;
  private helper: Object3D;
  private controls: TransformControls;
  private context: Context;
  constructor(
    context: Context,
    origin: Vector3,
    normal: Vector3,
    onStartDragging: Function,
    onEndDragging: Function
  ) {
    super(context);
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
    const geom = new PlaneGeometry(5, 5, 1);
    const mat = new MeshBasicMaterial({
      color: 0xffff00,
      side: DoubleSide,
      transparent: true,
      opacity: 0.2
    });
    return new Mesh(geom, mat);
  }
}
