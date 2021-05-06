import * as THREE from 'three';
import { createSideMenuButton } from '../gui/gui-creator';
import { scene } from '../scene/scene';

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x555555 });
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const invisibleMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0
});

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
        if (!item.isSelected) item.material = item.material.transparent ? invisibleMaterial : whiteMaterial;
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
        if (!item.isSelected) item.material = item.ifcMaterial;
      }
    });
  });
}

function getEdges(item) {
  const geometry = new THREE.EdgesGeometry(item.geometry);
  const material = lineMaterial;
  return new THREE.LineSegments(geometry, material);
}

export { edgesDisplayActive, whiteMaterial };
