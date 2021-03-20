import * as THREE from 'three';
import { createSideMenuButton } from '../gui/gui-creator';
import { renderer, scene, camera } from '../scene/scene';

export function setupClippingPlanes() {
  const button = createSideMenuButton('./resources/section-plane-down.svg');
  button.addEventListener('click', () => {
    button.blur();
    activateSectionPlaneMode();
  });
}

const sectionPlane = new THREE.Plane(new THREE.Vector3(-0, -1, 0), 0);
sectionPlane.constant = 500;
renderer.clippingPlanes = [sectionPlane];

let sectionPlaneGeometry;
let previousEvent;

function activateSectionPlaneMode() {
  const canvas = document.getElementById('three-canvas');

  const geometry = new THREE.PlaneGeometry(100, 100);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide
  });
  sectionPlaneGeometry = new THREE.Mesh(geometry, material);
  sectionPlaneGeometry.rotation.x += Math.PI / 2;
  scene.add(sectionPlane);

  canvas.onpointermove = locateSectionPlane;
  previousEvent = canvas.onclick;
  canvas.onclick = lockSectionPlanePosition;
}

function locateSectionPlane(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const ifcObjects = [];
  scene.children.forEach((item) => {
    if (item.isIFC && item.children) {
      ifcObjects.push(...item.children);
    }
  });

  const intersected = raycaster.intersectObjects(ifcObjects)[0];
  if (intersected) {
    console.log(intersected.point.z);
    sectionPlane.constant = intersected.point.y;
  } else {
    sectionPlane.constant = 500;
  }
}

function lockSectionPlanePosition(event) {
  const canvas = document.getElementById('three-canvas');
  canvas.onpointermove = {};
  canvas.onclick = previousEvent;
}
