import * as THREE from 'three';
import { createSideMenuButton } from '../gui/gui-creator';
import { renderer, scene, camera, getIfcObjects, cameraControls } from '../scene/scene';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

class Plane {

	constructor(scene, origin, normal) {

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

	get visible() {
		return this._visible;
	}

	set visible(visible) {
		this._visible = visible;
		this._control_object.visible = visible;
	}
}

class ClippingComponent {

	planes = [];

	constructor(scene) {
		this.scene = scene;
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

		window.addEventListener("mousemove", this.onMouseMove, false);
		window.addEventListener("mouseup", this.createPlaneOnClick, false);
	}

	onMouseMove = (event) => {
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	};

	activateCreatePlaneFromRaycast = () => {
		this.raycasting = true;
	};

	createPlaneOnClick = () => {
		if (this.raycasting) {
			this.raycaster.setFromCamera(this.mouse, this.scene.camera);

			const intersects = this.raycaster.intersectObjects(getIfcObjects(), true);

			if (intersects.length > 0) {
				this.createPlaneFromIntersection(intersects[0]);
				this.raycasting = false;
				this.intersection = undefined;
			}
		}
	};

	createPlaneFromIntersection = (intersection) => {

		const constant = intersection.point.distanceTo(new THREE.Vector3(0, 0, 0));
		const normal = intersection.face?.normal;

		if (constant && normal) {
			const normalMatrix = new THREE.Matrix3().getNormalMatrix(intersection.object.matrixWorld);
			const worldNormal = normal.clone().applyMatrix3(normalMatrix).normalize();

			const plane = new Plane(this.scene, intersection.point, worldNormal);
			plane.plane.setFromNormalAndCoplanarPoint(worldNormal.negate(), intersection.point);
			this.planes.push(plane);

			getIfcObjects().forEach(obj => {
				if(obj.isMesh){
					if(Array.isArray(obj.material)){
						obj.material.forEach((m) => {
							m.clippingPlanes = this.planes.map((e) => e.plane);
						})
					}else if(obj.material) {
						obj.material.clippingPlanes = this.planes.map((e) => e.plane);
					}
				}
			})
		}
	};
}

// Setup below
const clippingComponent = new ClippingComponent(scene);

export function setupClippingPlanes() {
	const button = createSideMenuButton('./resources/section-plane-down.svg');
	button.addEventListener('click', () => {
		button.blur();
		activateSectionPlaneMode();
	});
}

function activateSectionPlaneMode() {
	const canvas = document.getElementById('three-canvas');

	canvas.onclick = (event) => {

		// Temporary exit to prevent multiple planes
		// Maybe adding some additional UI to help with creating/deleting planes.
		if(clippingComponent.planes.length === 1) return;

		const mouse = new THREE.Vector2();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse, camera);

		const objects = getIfcObjects();
		const intersected = raycaster.intersectObjects(objects)[0];
		if (intersected) {
			clippingComponent.createPlaneFromIntersection(intersected)
		}
	};
}