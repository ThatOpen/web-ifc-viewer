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
import { Component } from '../../../base-types';
import { IfcViewerAPI } from '../../../ifc-viewer-api';

export class IfcPlane extends Component {
  plane: Plane;
  planeMesh: Mesh;
  visible: boolean;
  private normal: Vector3;
  private origin: Vector3;
  private helper: Object3D;
  private controls: TransformControls;
  private api: IfcViewerAPI;
  constructor(
    api: IfcViewerAPI,
    origin: Vector3,
    normal: Vector3,
    onStartDragging: Function,
    onEndDragging: Function
  ) {
    super();
    this.api = api;
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
    this.api.ifcScene.remove(this.helper);
    this.api.ifcScene.remove(this.controls);
  };

  private newTransformControls() {
    const camera = this.api.ifcCamera.camera;
    const container = this.api.ifcRenderer.renderer.domElement;
    const controls = new TransformControls(camera, container);
    this.initializeControls(controls);
    this.api.ifcScene.add(controls);
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
      this.api.ifcCamera.toggleControls(this.visible);
      if (event.value) onStart();
      else onEnd();
    });
  }

  private createHelper() {
    const helper = new Object3D();
    helper.lookAt(this.normal);
    helper.position.copy(this.origin);
    this.api.ifcScene.add(helper);
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
