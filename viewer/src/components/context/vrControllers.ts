import { Vector3, Line, BufferGeometry, Object3D, Group, Matrix4, Quaternion } from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import { IfcContext } from './context';
import { IfcManager } from '../ifc';

export class IfcVrControllers {
  context: IfcContext;
  ifcManager: IfcManager;
  controller1: Group;
  controller2: Group;
  controllerGrip1: Group;
  controllerGrip2: Group;
  cameraDolly = new Object3D();
  dummyCam = new Object3D();
  tempMatrix = new Matrix4();
  letUserMove: Boolean = false;

  constructor(context: IfcContext, ifcManager: IfcManager) {
    this.context = context;
    this.context.webXrMoveTracking = this.handleUserMovement;
    this.ifcManager = ifcManager;
    this.controller1 = this.context.renderer.renderer.xr.getController(0);
    this.controller1.addEventListener('squeezestart', this.allowMovement.bind(this));
    this.controller1.addEventListener('squeezeend', this.stopMovement.bind(this));
    this.controller2 = this.context.renderer.renderer.xr.getController(1);
    this.controller2.addEventListener('selectstart', this.highlight.bind(this));
    this.controller2.addEventListener('squeezestart', this.clearHighlight.bind(this));
    const controllerModelFactory = new XRControllerModelFactory();
    this.controllerGrip1 = this.context.renderer.renderer.xr.getControllerGrip(0);
    this.controllerGrip1.add(controllerModelFactory.createControllerModel(this.controllerGrip1));
    this.controllerGrip2 = this.context.renderer.renderer.xr.getControllerGrip(1);
    this.controllerGrip2.add(controllerModelFactory.createControllerModel(this.controllerGrip2));
    this.context.getScene().add(this.controller1);
    this.context.getScene().add(this.controller2);
    this.context.getScene().add(this.controllerGrip1);
    this.context.getScene().add(this.controllerGrip2);
    const geometry = new BufferGeometry().setFromPoints([
      new Vector3(0, 0, 0),
      new Vector3(0, 0, -1)
    ]);
    const line = new Line(geometry);
    line.name = 'line';
    line.scale.z = 5;
    this.controller1.add(line.clone());
    this.controller2.add(line.clone());
    this.context.getCamera().position.set(0, 0, 0);
    this.cameraDolly.add(this.context.getCamera());
    this.context.getCamera().add(this.dummyCam);
    // Needed to add controllers to dolly?? Not sure without device to test on
    // this.cameraDolly.add(this.controller1);
    // this.cameraDolly.add(this.controller2);
    // this.cameraDolly.add(this.controllerGrip1);
    // this.cameraDolly.add(this.controllerGrip2);
  }

  highlight(event: any) {
    const controller = event.target as Group;
    const found = this.context.castVrRay(controller.matrixWorld, this.tempMatrix);
    if (found) {
      this.ifcManager.selector.selection.pick(found);
    } else {
      this.ifcManager.selector.selection.unpick();
    }
  }

  clearHighlight() {
    this.ifcManager.selector.selection.unpick();
  }

  allowMovement() {
    this.letUserMove = true;
  }

  stopMovement() {
    this.letUserMove = false;
  }

  handleUserMovement = () => {
    if (this.letUserMove) {
      const speed = 2;
      const moveZ = -0.05 * speed;
      const saveQuat = this.cameraDolly.quaternion.clone();
      const holder = new Quaternion();
      this.dummyCam.getWorldQuaternion(holder);
      this.cameraDolly.quaternion.copy(holder);
      this.cameraDolly.translateZ(moveZ);
      this.cameraDolly.quaternion.copy(saveQuat);
    }
  };
}
