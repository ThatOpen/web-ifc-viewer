import { scene, ifcLoader } from '../scene/scene';
import { createSideMenuButton } from '../gui/gui-creator';

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

function loadIfc(event) {
  var ifcURL = URL.createObjectURL(event.target.files[0]);
  ifcLoader.load(ifcURL, (geometry) => {
    loadedObject = geometry;
    loadedObject.isIFC = true;
    scene.add(loadedObject);
  });
}
