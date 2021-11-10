import { CameraProjections, IfcViewerAPI, NavigationModes } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import { IFCSPACE, IFCSTAIR, IFCCOLUMN, IFCWALLSTANDARDCASE, IFCWALL, IFCSLAB, IFCOPENINGELEMENT } from 'web-ifc';
import {
  Vector3,
  MeshBasicMaterial,
} from 'three';
import { updateModel } from './edges';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container });
viewer.addAxes();
viewer.addGrid();
viewer.IFC.setWasmPath('files/');
viewer.IFC.loader.ifcManager.applyWebIfcConfig({
  COORDINATE_TO_ORIGIN: true,
  USE_FAST_BOOLS: true
});
viewer.IFC.loader.ifcManager.useWebWorkers(true, 'files/IFCWorker.js');


// Setup loader
const loadIfc = async (event) => {
  const overlay = document.getElementById('loading-overlay');
  const progressText = document.getElementById('loading-progress');

  overlay.classList.remove('hidden');
  progressText.innerText = `Loading`;

  viewer.IFC.loader.ifcManager.setOnProgress((event) => {
    const percentage = Math.floor((event.loaded * 100) / event.total);
    progressText.innerText = `Loaded ${percentage}%`;
  });

  viewer.IFC.loader.ifcManager.parser.setupOptionalCategories({
    [IFCSPACE]: false,
    [IFCOPENINGELEMENT]: false
  });

  const model = await viewer.IFC.loadIfc(event.target.files[0], true);
  if (!model) return;
  overlay.classList.add('hidden');
}

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

// viewer.IFC.loadIfcUrl('test.ifc', true);

// async function createFill() {
//   const wallsStandard = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCWALLSTANDARDCASE, false);
//   const walls = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCWALL, false);
//   const stairs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCSTAIR, false);
//   const columns = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCCOLUMN, false);
//   const slabs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCSLAB, false);
//   const ids = [...walls, ...wallsStandard, ...columns, ...slabs, ...stairs];
//   const fill = viewer.fills.create('example', 0, ids, new MeshBasicMaterial({color: 0xffffff}));
//   if(fill) {
//     fill.position.y += 0.01;
//   }
// }

const handleKeyDown = (event) => {
  if (event.code === 'Delete') {
    viewer.removeClippingPlane();
    viewer.dimensions.delete()
  }
  if (event.code === 'KeyO') {
    viewer.context.getIfcCamera().toggleProjection();
  }
  if (event.code === 'KeyC') {
    viewer.plans.create({
      name: '01',
      camera: new Vector3(0, 10, 0),
      target: new Vector3(0, 0, 0),
      normal: new Vector3(0, -1, 0),
      point: new Vector3(0, 2, 0)
    });
    viewer.plans.goTo("01");
  }
  if (event.code === 'KeyF') {
    // createFill();
    loadLines();
  }
};

async function loadLines() {
  const model = await viewer.IFC.loadIfcUrl('test.ifc');
  if(!model) return;
  const scene = viewer.context.getScene();
  updateModel(model, scene);
}

window.onmousemove = viewer.IFC.prePickIfcItem;
window.onkeydown = handleKeyDown;
window.ondblclick = async () => {
  viewer.clipper.createPlane();
  // viewer.IFC.pickIfcItem(true);
};

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

