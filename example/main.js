import { CameraProjections, IfcViewerAPI, NavigationModes } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import { IFCWALLSTANDARDCASE } from 'three/examples/jsm/loaders/ifc/web-ifc-api';
import { Vector3 } from 'three';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container });
viewer.addAxes();
viewer.addGrid();

viewer.IFC.setWasmPath('files/');
viewer.IFC.loader.ifcManager.applyWebIfcConfig({
  COORDINATE_TO_ORIGIN: true,
  USE_FAST_BOOLS: false
});
viewer.IFC.loader.ifcManager.useWebWorkers(true, 'files/IFCWorker.js');

//Setup loader
const loadIfc = async (event) => {
  const overlay = document.getElementById("loading-overlay");
  const progressText = document.getElementById("loading-progress");

  overlay.classList.remove("hidden")
  progressText.innerText = `Loading`;

  viewer.IFC.loader.ifcManager.setOnProgress((event) => {
    const percentage = Math.floor((event.loaded * 100) / event.total);
    progressText.innerText = `Loaded ${percentage}%`;
  })

  await viewer.IFC.loadIfc(event.target.files[0], false);
  overlay.classList.add("hidden")
};

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

let togglePostProduction = false;
const handleKeyDown = (event) => {
  if (event.code === 'Delete') {
    viewer.removeClippingPlane();
  } else if (event.code === 'KeyP') {
    viewer.context.renderer.postProduction.ssaoEffect.ssaoMaterial.uniforms.intensity.value = togglePostProduction ? 10 : 0;
    togglePostProduction = !togglePostProduction;
  }
};

window.onmousemove = viewer.IFC.prePickIfcItem;
window.onkeydown = handleKeyDown;
window.ondblclick = async () => {
  viewer.clipper.createPlane();
}

//Setup UI
const loadButton = createSideMenuButton('./resources/folder-icon.svg');
loadButton.addEventListener('click', () => {
  loadButton.blur();
  inputElement.click();
});

const sectionButton = createSideMenuButton('./resources/section-plane-down.svg');
sectionButton.addEventListener('click', () => {
  sectionButton.blur();
  viewer.toggleClippingPlanes();
});

const dropBoxButton = createSideMenuButton('./resources/dropbox-icon.svg');
dropBoxButton.addEventListener('click', () => {
  dropBoxButton.blur();
  viewer.openDropboxWindow();
});

