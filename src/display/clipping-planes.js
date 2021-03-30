import * as THREE from 'three';
import { createSideMenuButton } from '../gui/gui-creator';
import { renderer, scene, camera, getIfcObjects, cameraControls } from '../scene/scene';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

class Plane {

	_visible = true;

	constructor(scene, origin, normal, onStartDragging, onEndDragging) {

		this.scene = scene;

		const plane = new THREE.Plane();
		const constant = plane.constant;

		// A 'empty' to help with some transformations
		// Can also be used to house visual helpers -- see below
		const controlObject = new THREE.Object3D();
		controlObject.lookAt(normal);
		controlObject.position.copy(origin);
		scene.add(controlObject);

		// A visual helper for the user to see the plan
		const planeGeometry = new THREE.PlaneGeometry(5, 5, 1);
		const planeMaterial = new THREE.MeshBasicMaterial({
			color: 0xffff00, side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.2
		});
		
		const planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
		controlObject.add(planeMesh);

		//The transform controls to move the plane
		const controls = new TransformControls(camera, renderer.domElement);
		controls.attach(controlObject);
		controls.showX = false;
		controls.showY = false;
		controls.setSpace("local");
		scene.add(controls);

		controls.addEventListener('change', () => {
			plane.setFromNormalAndCoplanarPoint(normal, controlObject.position);
		});

		controls.addEventListener('dragging-changed', (event) => {
			//Disable camera movement when dragging
			cameraControls.enabled = !event.value;
			this.visible = cameraControls.enabled;

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

	get planeMesh(){
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

	removeFromScene = () => {
		this.scene.remove(this._control_object);
		this.scene.remove(this._transform_controls);
	}
}

class ClippingComponent {

	dragging = false;
	enabled = false;
	planes = [];

	constructor(scene, camera) {
		this.scene = scene;
		this.camera = camera;
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

		const canvas = document.getElementById('three-canvas');
		canvas.onmousemove = this.handleMouseMove;
		canvas.ondblclick = this.handleDblClick;

		// This doesn't seem to work with canvas.onkeydown
		window.onkeydown = this.handleKeyDown;
	}

	set active(state){
		console.log("Clipping Active: " + state);
		this.enabled = state;
		this.planes.forEach((plane) => {
			plane.visible = state;
		})
		this.updateMaterials();
	}

	get active(){
		return this.enabled;
	}

	handleMouseMove = (event) => {
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	};

	handleDblClick = () => {
		if(!this.dragging && this.enabled){
			this.createPlaneFromRaycaster();
		}
	}

	handleKeyDown = (event) => {
		if(!this.active) return;

		// Deleting a plane
		if (event.code == 'Delete') {
			this.raycaster.setFromCamera(this.mouse, this.camera);
			const planeMeshes = this.planes.map((plane) => plane.planeMesh);
			const intersects = this.raycaster.intersectObjects(planeMeshes, false);
			if(intersects.length > 0){
				const matchingPlane = this.planes.find((plane) => plane.planeMesh === intersects[0].object);
				if(matchingPlane){
					this.deletePlane(matchingPlane);
				}
			}
		}
	}

	createPlaneFromRaycaster = () => {
		this.raycaster.setFromCamera(this.mouse, this.camera);
		const intersects = this.raycaster.intersectObjects(getIfcObjects(), true);

		if (intersects.length > 0) {
			this.createPlaneFromIntersection(intersects[0]);
			this.intersection = undefined;
		}
	}

	createPlaneFromIntersection = (intersection) => {
		const constant = intersection.point.distanceTo(new THREE.Vector3(0, 0, 0));
		const normal = intersection.face?.normal;

		if (constant && normal) {
			const normalMatrix = new THREE.Matrix3().getNormalMatrix(intersection.object.matrixWorld);
			const worldNormal = normal.clone().applyMatrix3(normalMatrix).normalize();

			const handleStartDragging = () => this.dragging = true;
			const handleEndDragging = () => this.dragging = false;

			const plane = new Plane(this.scene, intersection.point, worldNormal, handleStartDragging, handleEndDragging);
			plane.plane.setFromNormalAndCoplanarPoint(worldNormal.negate(), intersection.point);
			this.planes.push(plane);

			this.updateMaterials();
		}
	};

	updateMaterials = () => {
		// This could be improved.
		// Applying clipping to IfcObjects only
		const activePlanes = this.planes.filter((plane) => plane.visible);
		getIfcObjects().forEach(obj => {
			if(obj.isMesh){
				if(Array.isArray(obj.material)){
					obj.material.forEach((m) => {
						m.clippingPlanes = activePlanes.map((e) => e.plane);
					})
				}else if(obj.material) {
					obj.material.clippingPlanes = activePlanes.map((e) => e.plane);
				}
			}
		})
	}

	deletePlane = (plane) => {
		const index = this.planes.indexOf(plane);
		if(index !== -1) {
			plane.removeFromScene();
			this.planes.splice(index, 1);
			this.updateMaterials();
		}
	}
}

export function setupClippingPlanes() {
	const clippingComponent = new ClippingComponent(scene, camera);
	const button = createSideMenuButton('./resources/section-plane-down.svg');
	button.addEventListener('click', () => {
		button.blur();
		clippingComponent.active = !clippingComponent.active;
	});
}