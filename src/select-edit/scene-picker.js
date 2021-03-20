//source: https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
import { camera, scene, ifcLoader } from '../scene/scene';
import * as THREE from 'three';
import {updatePropertiesMenu} from "../gui/ifc-properties-menu";

const selectedMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, side: THREE.DoubleSide });
let pickedItem = {};

export function setupScenePicking() {
  const canvas = document.getElementById('three-canvas');
  canvas.onpointerdown = pick;
}

function pick(event) {
  if (event.button != 0) return;

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
    pickedItem.material = pickedItem.currentMaterial;
    pickedItem.isSelected = false;

    pickedItem = intersected.object;
    pickedItem.isSelected = true;
    if (!pickedItem.ifcMaterial) pickedItem.ifcMaterial = pickedItem.material;
    pickedItem.material = selectedMaterial;

    const props = ifcLoader.getPropertiesById(pickedItem.expressID);
    updatePropertiesMenu(props.arguments);
  }
}