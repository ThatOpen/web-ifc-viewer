"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClippingComponent = void 0;
const THREE = require("three");
const TransformControls_js_1 = require("three/examples/jsm/controls/TransformControls.js");
const components_1 = require("../components");
class ClippingComponent extends components_1.Component {
    constructor(viewer) {
        super(viewer);
        this.dragging = false;
        this.enabled = false;
        this.planes = [];
        this.handleMouseMove = (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        this.handleDblClick = () => {
            if (!this.dragging && this.enabled) {
                this.createPlaneFromRaycaster();
            }
        };
        this.handleKeyDown = (event) => {
            if (!this.active)
                return;
            // Deleting a plane
            if (event.code == 'Delete') {
                this.raycaster.setFromCamera(this.mouse, this.camera);
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
        this.createPlaneFromRaycaster = () => {
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.viewer.ifcObjects, true);
            if (intersects.length > 0) {
                this.createPlaneFromIntersection(intersects[0]);
                this.intersection = undefined;
            }
        };
        this.createPlaneFromIntersection = (intersection) => {
            var _a;
            const constant = intersection.point.distanceTo(new THREE.Vector3(0, 0, 0));
            const normal = (_a = intersection.face) === null || _a === void 0 ? void 0 : _a.normal;
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
        this.updateMaterials = () => {
            // This could be improved.
            // Applying clipping to IfcObjects only
            const activePlanes = this.planes.filter((plane) => plane.visible);
            this.viewer.ifcObjects.forEach((obj) => {
                if (obj instanceof THREE.Mesh) {
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach((m) => {
                            m.clippingPlanes = activePlanes.map((e) => e.plane);
                        });
                    }
                    else if (obj.material) {
                        obj.material.clippingPlanes = activePlanes.map((e) => e.plane);
                    }
                }
            });
        };
        this.deletePlane = (plane) => {
            const index = this.planes.indexOf(plane);
            if (index !== -1) {
                plane.removeFromScene();
                this.planes.splice(index, 1);
                this.updateMaterials();
            }
        };
        this.scene = viewer.scene;
        this.camera = viewer.camera;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        const canvas = viewer.renderer.domElement;
        canvas.onmousemove = this.handleMouseMove;
        canvas.ondblclick = this.handleDblClick;
        // This doesn't seem to work with canvas.onkeydown
        window.onkeydown = this.handleKeyDown;
    }
    set active(state) {
        console.log("Clipping Active: " + state);
        this.enabled = state;
        this.planes.forEach((plane) => {
            plane.visible = state;
        });
        this.updateMaterials();
    }
    get active() {
        return this.enabled;
    }
}
exports.ClippingComponent = ClippingComponent;
class Plane extends components_1.Component {
    constructor(viewer, origin, normal, onStartDragging, onEndDragging) {
        super(viewer);
        this._visible = true;
        this.removeFromScene = () => {
            this.scene.remove(this._control_object);
            this.scene.remove(this._transform_controls);
        };
        this.scene = viewer.scene;
        this.camera = viewer.camera;
        const plane = new THREE.Plane();
        const constant = plane.constant;
        // A 'empty' to help with some transformations
        // Can also be used to house visual helpers -- see below
        const controlObject = new THREE.Object3D();
        controlObject.lookAt(normal);
        controlObject.position.copy(origin);
        this.scene.add(controlObject);
        // A visual helper for the user to see the plan
        const planeGeometry = new THREE.PlaneGeometry(5, 5, 1);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00, side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.2
        });
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        controlObject.add(planeMesh);
        //The transform controls to move the plane
        const controls = new TransformControls_js_1.TransformControls(this.camera, this.viewer.renderer.domElement);
        controls.attach(controlObject);
        controls.showX = false;
        controls.showY = false;
        controls.setSpace("local");
        this.scene.add(controls);
        controls.addEventListener('change', () => {
            plane.setFromNormalAndCoplanarPoint(normal, controlObject.position);
        });
        controls.addEventListener('dragging-changed', (event) => {
            //Disable camera movement when dragging
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
    get plane() {
        return this._plane;
    }
    get planeMesh() {
        return this._planeMesh;
    }
    get visible() {
        return this._visible;
    }
    set visible(visible) {
        this._visible = visible;
        this._control_object.visible = visible;
        this._transform_controls.visible = visible;
    }
}
//# sourceMappingURL=clipping-planes.js.map