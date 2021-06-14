/* eslint-disable max-classes-per-file */
import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { Component } from '../components';
import { Viewer } from '../core';

export class ClippingComponent extends Component {
    dragging: boolean = false;
    enabled: boolean = false;
    planes: Plane[] = [];

    scene: THREE.Scene;
    camera: THREE.Camera;
    raycaster: THREE.Raycaster;
    intersection: THREE.Intersection | undefined;

    constructor(viewer: Viewer) {
      super(viewer);

      this.scene = viewer.scene;
      this.camera = viewer.camera;
      this.raycaster = new THREE.Raycaster();

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
        plane.visible = state;
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
        if (intersects.length > 0) {
          const matchingPlane = this.planes.find((plane) => plane.planeMesh === intersects[0].object);
          if (matchingPlane) {
            this.deletePlane(matchingPlane);
          }
        }
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

    createPlaneFromIntersection = (intersection: THREE.Intersection) => {
      const constant = intersection.point.distanceTo(new THREE.Vector3(0, 0, 0));
      const normal = intersection.face?.normal;

      if (constant && normal) {
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(intersection.object.matrixWorld);
        const worldNormal = normal.clone().applyMatrix3(normalMatrix).normalize();

        const handleStartDragging = () => this.dragging = true;
        const handleEndDragging = () => this.dragging = false;

        const plane = new Plane(this.viewer, intersection.point, worldNormal, handleStartDragging, handleEndDragging);
        plane.plane.setFromNormalAndCoplanarPoint(worldNormal.negate(), intersection.point);
        this.planes.push(plane);

        this.updateMaterials();
      }
    };

    updateMaterials = () => {
      // This could be improved.
      // Applying clipping to IfcObjects only
      const activePlanes = this.planes.filter((plane) => plane.visible);
      this.viewer.ifcObjects.forEach((obj: THREE.Object3D) => {
        const mesh = obj as THREE.Mesh;

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

    deletePlane = (plane: Plane) => {
      const index = this.planes.indexOf(plane);
      if (index !== -1) {
        plane.removeFromScene();
        this.planes.splice(index, 1);
        this.updateMaterials();
      }
    };
}

class Plane extends Component {
    _constant: number;
    _control_object: THREE.Object3D;
    _transform_controls: TransformControls;
    _planeGeometry: THREE.PlaneGeometry;
    _planeMaterial: THREE.Material;
    scene: THREE.Scene;
    camera: THREE.Camera;

    constructor(viewer: Viewer, origin: THREE.Vector3, normal: THREE.Vector3, onStartDragging: Function, onEndDragging: Function) {
      super(viewer);

      this.scene = viewer.scene;
      this.camera = viewer.camera;

      const plane = new THREE.Plane();
      const { constant } = plane;

      // A 'empty' to help with some transformations
      // Can also be used to house visual helpers -- see below
      const controlObject = new THREE.Object3D();
      controlObject.lookAt(normal);
      controlObject.position.copy(origin);
      this.scene.add(controlObject);

      // A visual helper for the user to see the plan
      const planeGeometry = new THREE.PlaneGeometry(5, 5, 1);
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2,
      });

      const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
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
        event.value ? onStartDragging() : onEndDragging();
      });

      this._plane = plane;
      this._constant = constant;
      this._control_object = controlObject;
      this._transform_controls = controls;
      this._planeGeometry = planeGeometry;
      this._planeMaterial = planeMaterial;
      this._planeMesh = planeMesh;
    }

    _visible = true;

    get visible() {
      return this._visible;
    }

    set visible(visible) {
      this._visible = visible;
      this._control_object.visible = visible;
      this._transform_controls.visible = visible;
    }

    _plane: THREE.Plane;

    get plane() {
      return this._plane;
    }

    _planeMesh: THREE.Mesh;

    get planeMesh() {
      return this._planeMesh;
    }

    removeFromScene = () => {
      this.scene.remove(this._control_object);
      this.scene.remove(this._transform_controls);
    };
}