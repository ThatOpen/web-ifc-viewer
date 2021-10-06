import { CameraProjections, IfcViewerAPI, NavigationModes } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import { IFCWALLSTANDARDCASE } from 'three/examples/jsm/loaders/ifc/web-ifc-api';
import { Vector3 } from 'three';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container });
viewer.addAxes();
viewer.addGrid();

viewer.IFC.setWasmPath('files/');
// viewer.IFC.loader.ifcManager.applyWebIfcConfig({
//   COORDINATE_TO_ORIGIN: false,
//   USE_FAST_BOOLS: false
// });
// viewer.IFC.loader.ifcManager.useJSONData();
// viewer.IFC.loader.ifcManager.useWebWorkers(true, 'files/IFCWorker.js');
viewer.IFC.loader.ifcManager.loadJsonDataFromWorker(0, '01.json');

//Setup loader
const loadIfc = async (event) => {
  await viewer.IFC.loadIfc(event.target.files[0], false);
};

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

viewer.dimensions.active = true;
viewer.dimensions.previewActive = true;

const handleKeyDown = (event) => {
  if (event.code === 'Delete') {
    viewer.removeClippingPlane();
    viewer.dimensions.delete();
    viewer.context.ifcCamera.unlock();
  }
  if (event.code === 'Space') {
    viewer.context.ifcCamera.setNavigationMode(NavigationModes.FirstPerson);
    viewer.IFC.unPrepickIfcItems();
    window.onmousemove = null;
  }
  if (event.code === 'KeyH') {
    viewer.context.ifcCamera.goToHomeView();
  }
  if (event.code === 'KeyD') {
    // viewer.dimensions.create();
    viewer.context.ifcCamera.setNavigationMode(NavigationModes.FirstPerson);
  }
  if (event.code === 'Escape') {
    window.onmousemove = viewer.IFC.prePickIfcItem;
  }
  if (event.code === "KeyP") {
    viewer.context.ifcCamera.projection = CameraProjections.Perspective;
  }
  if (event.code === "KeyO") {
    viewer.context.ifcCamera.projection = CameraProjections.Orthographic;
  }
  if (event.code === "KeyA"){
    viewer.clipper.createFromNormalAndCoplanarPoint(
      new Vector3(0, 0, -1),
      new Vector3(0, 0,  11.369973182678223)
    )
  }
};

// window.onmousemove = viewer.IFC.prePickIfcItem;
window.onkeydown = handleKeyDown;
window.ondblclick = async () => {
  viewer.clipper.createPlane();
  // const result = await viewer.IFC.pickIfcItem(true);
  // if(result) {
  //   // const props = await viewer.IFC.getProperties(result.modelID, result.id, true);
  //   const all = await viewer.IFC.getAllItemsOfType(result.modelID, IFCWALLSTANDARDCASE, false);
  //   console.log(all);
  // }
}

// viewer.IFC.applyWebIfcConfig({
//   COORDINATE_TO_ORIGIN: true,
//   USE_FAST_BOOLS: true
// });

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