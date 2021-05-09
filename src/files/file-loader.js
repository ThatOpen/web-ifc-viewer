import { scene, ifcLoader, camera, cameraControls } from '../scene/scene';
import { createSideMenuButton } from '../gui/gui-creator';
import * as THREE from 'three';

let loadedObject;

export function setupIfcReader() {
  const inputElement = createInputElement();
  const button = createSideMenuButton('./resources/folder-icon.svg');
  button.addEventListener('click', () => {
    button.blur();
    inputElement.click();
  });
}

function createInputElement() {
  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'file');
  inputElement.classList.add('hidden');
  document.body.appendChild(inputElement);
  inputElement.addEventListener('change', (event) => loadIfc(event), false);
  return inputElement;
}

function fitModelToFrame() {
  const box = new THREE.Box3().setFromObject(scene.children[scene.children.length - 1]);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
 

  const halfSizeToFitOnScreen = boxSize * 0.5;
  const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
  const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

  const direction = new THREE.Vector3()
    .subVectors(camera.position, boxCenter)
    .multiply(new THREE.Vector3(1, 0, 1))
    .normalize();

  camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
  camera.near = 0.001;
  camera.far = boxSize * 200;
  camera.updateProjectionMatrix();
  camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);

  // set target to newest loaded model
  cameraControls.target.copy(boxCenter);
  cameraControls.update();
}

function loadIfc(event) {
  var ifcURL = URL.createObjectURL(event.target.files[0]);
  ifcLoader.load(ifcURL, (geometry) => {
    loadedObject = geometry;
    loadedObject.isIFC = true;
    scene.add(loadedObject);

    fitModelToFrame();
  });
}
