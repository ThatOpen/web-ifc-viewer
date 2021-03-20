import * as THREE from 'three';
import { createSideMenuButton } from '../gui/gui-creator';
import { scene } from '../scene/scene';

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x555555 });
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const invisibleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });

let edgesDisplayActive = false;

//TODO: Merge all wireframes in single object
//TODO: Create all wireframes on init async

export function setupEdgesDisplay() {
  const button = createSideMenuButton('./resources/wireframe-cube.svg');
  button.addEventListener('click', () => {
    button.blur();
    edgesDisplayActive ? deactivateEdgeDisplay() : activateEdgeDisplay();
  });
}

function activateEdgeDisplay() {
  edgesDisplayActive = true;
  scene.children.forEach((object) => {
    object.children.forEach((item) => {
      if (item.type === 'Mesh') {
        if (!item.ifcMaterial) item.ifcMaterial = item.material;
        item.wireframe ? (item.wireframe.visible = true) : (item.wireframe = getEdges(item));
        item.add(item.wireframe);
        item.currentMaterial = item.material.transparent ? invisibleMaterial : whiteMaterial;
        if(!item.isSelected) item.material = item.currentMaterial;
      }
    });
  });
}

function deactivateEdgeDisplay() {
  edgesDisplayActive = false;
  scene.children.forEach((object) => {
    object.children.forEach((item) => {
      if (item.type === 'Mesh') {
        if (item.wireframe) item.wireframe.visible = false;
        item.currentMaterial = item.ifcMaterial;
        if(!item.isSelected) item.material = item.currentMaterial;
      }
    });
  });
}

function getEdges(item) {
  const geometry = new THREE.EdgesGeometry(item.geometry);
  const material = lineMaterial;
  return new THREE.LineSegments(geometry, material);
}
