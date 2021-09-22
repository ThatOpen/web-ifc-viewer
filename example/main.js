import { IfcViewerAPI, NavigationModes } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import { IFCWALLSTANDARDCASE } from 'three/examples/jsm/loaders/ifc/web-ifc-api';
import { DirectionalLight, MeshLambertMaterial, Vector3 } from 'three';

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
  await viewer.IFC.loadIfc(event.target.files[0], false);
};

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

const handleKeyDown = (event) => {
  if (event.code === 'Delete') {
    // viewer.removeClippingPlane();
    viewer.IFC.setModelTranslucency(0, true, 0.1, true);
  }
  if (event.code === 'Space') {
    viewer.context.ifcCamera.setNavigationMode(NavigationModes.FirstPerson);
  }
  if (event.code === 'KeyP') {
    viewer.context.ifcCamera.goToHomeView();
  }
};

window.onmousemove = viewer.IFC.prePickIfcItem;
window.onkeydown = handleKeyDown;
window.ondblclick = async () => {
  const result = await viewer.IFC.pickIfcItem(true);
  if(result) {
    const props = await viewer.IFC.getProperties(result.modelID, result.id, true);
    console.log(props);
  }
}

viewer.IFC.applyWebIfcConfig({
  COORDINATE_TO_ORIGIN: true,
  USE_FAST_BOOLS: true
});

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