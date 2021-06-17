/* eslint-disable max-classes-per-file */
import {
  Object3D,
  PlaneGeometry,
  Material,
  Scene,
  Camera,
  Vector3,
  Matrix3,
  Plane,
  MeshBasicMaterial,
  DoubleSide,
  Raycaster,
  Intersection,
  Mesh
} from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { Component } from '../components';
import { Viewer } from '../core';

class IfcPlane extends Component {
  plane: Plane;
  planeMesh: Mesh;
  visible: boolean;
  scene: Scene;
  camera: Camera;
  private constant: number;
  private controlObject: Object3D;
  private transformControls: TransformControls;
  private planeGeometry: PlaneGeometry;
  private planeMaterial: Material;

  constructor(
    viewer: Viewer,
    origin: Vector3,
    normal: Vector3,
    onStartDragging: Function,
    onEndDragging: Function
  ) {
    super(viewer);

    this.scene = viewer.scene;
    this.camera = viewer.camera;

    const plane = new Plane();
    const { constant } = plane;

    // @ts-ignore
    if (!this.camera.planes) this.camera.planes = [];
    // @ts-ignore
    this.camera.planes.push(plane);

    // A 'empty' to help with some transformations
    // Can also be used to house visual helpers -- see below
    const controlObject = new Object3D();
    controlObject.lookAt(normal);
    controlObject.position.copy(origin);
    this.scene.add(controlObject);

    // A visual helper for the user to see the plan
    const planeGeometry = new PlaneGeometry(5, 5, 1);
    const planeMaterial = new MeshBasicMaterial({
      color: 0xffff00,
      side: DoubleSide,
      transparent: true,
      opacity: 0.2
    });

    const planeMesh = new Mesh(planeGeometry, planeMaterial);
    controlObject.add(planeMesh);

    // The transform controls to move the plane
    const controls = new TransformControls(this.camera, this.viewer.renderer.domElement);
    controls.attach(controlObject);
    controls.showX = false;
    controls.showY = false;
    controls.setSpace('local');
    this.scene.add(controls);

    controls.addEventListener('change', () => {
      plane.setFromNormalAndCoplanarPoint(normal, controlObject.position);
    });

    controls.addEventListener('dragging-changed', (event) => {
      // Disable camera movement when dragging
      this.viewer.controls.enabled = !event.value;
      this.visible = this.viewer.controls.enabled;

      // Invoke the start/end drag events
      if (event.value) onStartDragging();
      else onEndDragging();
    });

    this.plane = plane;
    this.constant = constant;
    this.controlObject = controlObject;
    this.transformControls = controls;
    this.planeGeometry = planeGeometry;
    this.planeMaterial = planeMaterial;
    this.planeMesh = planeMesh;
    this.visible = true;
  }

  set isVisible(visible: boolean) {
    this.visible = visible;
    this.controlObject.visible = visible;
    this.transformControls.visible = visible;
  }

  removeFromScene = () => {
    this.scene.remove(this.controlObject);
    this.scene.remove(this.transformControls);
  };
}

export class ClippingComponent extends Component {
  dragging: boolean = false;
  enabled: boolean = false;
  planes: IfcPlane[] = [];

  scene: Scene;
  camera: Camera;
  raycaster: Raycaster;
  intersection: Intersection | undefined;

  constructor(viewer: Viewer) {
    super(viewer);

    this.scene = viewer.scene;
    this.camera = viewer.camera;
    this.raycaster = new Raycaster();

    const canvas = viewer.renderer.domElement;
    canvas.ondblclick = this.handleDblClick;

    // This doesn't seem to work with canvas.onkeydown
    window.onkeydown = this.handleKeyDown;
  }

  get active() {
    return this.enabled;
  }

  set active(state) {
    console.log(`Clipping Active: ${state}`);
    this.enabled = state;
    this.planes.forEach((plane) => {
      plane.isVisible = state;
    });
    this.updateMaterials();
  }

  handleDblClick = () => {
    if (!this.dragging && this.enabled) {
      this.createPlaneFromRaycaster();
    }
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.active) return;

    // Deleting a plane
    if (event.code === 'Delete') {
      this.raycaster.setFromCamera(this.viewer.mouse, this.camera);
      const planeMeshes = this.planes.map((plane) => plane.planeMesh);
      const intersects = this.raycaster.intersectObjects(planeMeshes, false);
      if (intersects.length <= 0) return;
      const matchingPlane = this.planes.find((plane) => plane.planeMesh === intersects[0].object);
      if (matchingPlane) this.deletePlane(matchingPlane);
    }
  };

  createPlaneFromRaycaster = () => {
    this.raycaster.setFromCamera(this.viewer.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.viewer.ifcObjects, true);

    if (intersects.length > 0) {
      this.createPlaneFromIntersection(intersects[0]);
      this.intersection = undefined;
    }
  };

  createPlaneFromIntersection = (intersection: Intersection) => {
    const constant = intersection.point.distanceTo(new Vector3(0, 0, 0));
    const normal = intersection.face?.normal;

    if (constant && normal) {
      const normalMatrix = new Matrix3().getNormalMatrix(intersection.object.matrixWorld);
      const worldNormal = normal.clone().applyMatrix3(normalMatrix).normalize();

      const handleStartDragging = this.activateDragging;
      const handleEndDragging = this.deactivateDragging;

      const plane = new IfcPlane(
        this.viewer,
        intersection.point,
        worldNormal,
        handleStartDragging,
        handleEndDragging
      );
      plane.plane.setFromNormalAndCoplanarPoint(worldNormal.negate(), intersection.point);
      this.planes.push(plane);

      this.updateMaterials();
    }
  };

  activateDragging = () => {
    this.dragging = true;
  };

  deactivateDragging = () => {
    this.dragging = false;
  };

  updateMaterials = () => {
    // This could be improved.
    // Applying clipping to IfcObjects only
    const activePlanes = this.planes.filter((plane) => plane.visible);
    this.viewer.ifcObjects.forEach((obj: Object3D) => {
      const mesh = obj as Mesh;

      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            m.clippingPlanes = activePlanes.map((e) => e.plane);
          });
        } else if (mesh.material) {
          mesh.material.clippingPlanes = activePlanes.map((e) => e.plane);
        }
      }
    });
  };

  deletePlane = (plane: IfcPlane) => {
    const index = this.planes.indexOf(plane);
    if (index !== -1) {
      plane.removeFromScene();
      this.planes.splice(index, 1);
      this.updateMaterials();
    }
  };
}
