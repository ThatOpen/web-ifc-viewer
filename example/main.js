import { IfcViewerAPI } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import {
  IFCSPACE,
  IFCOPENINGELEMENT,
  IFCWALLSTANDARDCASE,
  IFCWALL,
  IFCSTAIR,
  IFCCOLUMN,
  IFCSLAB,
  // IFCSTAIRFLIGHT,
  // IFCRAILING
} from 'web-ifc';
import {MeshBasicMaterial, LineBasicMaterial, Color} from 'three';
// import { exportDXF, exportPDF } from './dxf';
// import { fillSection } from './section-fill';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(255, 255, 255) });
viewer.addAxes();
viewer.addGrid();
viewer.IFC.setWasmPath('files/');

viewer.IFC.loader.ifcManager.useWebWorkers(true, 'files/IFCWorker.js');

// Setup loader

const lineMaterial = new LineBasicMaterial({color: 0x000000})
const baseMaterial = new MeshBasicMaterial({color: 0xffffff, side: 2});

let model;
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

  model = await viewer.IFC.loadIfc(event.target.files[0], true);
  model.material.forEach(mat => mat.side = 2);

  // createFill(model.modelID);

  viewer.edges.create(`${model.modelID}`, model.modelID, lineMaterial, baseMaterial);

  overlay.classList.add('hidden');
}

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

// viewer.IFC.loadIfcUrl('test.ifc', true);

let fills = [];
let fillPosition;
// async function createFill(modelID) {
  // const wallsStandard = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCWALLSTANDARDCASE, false);
  // const walls = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCWALL, false);
  // const stairs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCSTAIR, false);
  // const columns = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCCOLUMN, false);
  // const slabs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCSLAB, false);
  // const ids = [...walls, ...wallsStandard, ...columns, ...stairs, ...slabs];
  // const material = new MeshBasicMaterial({color: 0x555555});
  // material.polygonOffset = true;
  // material.polygonOffsetFactor = 10;
  // material.polygonOffsetUnits = 1;
  // fills.push(viewer.fills.create(`${modelID}`, modelID, ids, material));
  // if(fill) {
  //   fill.position.y += 0.01;
  // }
  // fill.visible = false;
// }

let counter = 0;

// let subset;
const handleKeyDown = async (event) => {
  if (event.code === 'Delete') {
    viewer.removeClippingPlane();
    viewer.dimensions.delete()
  }
  if (event.code === 'KeyF') {
    viewer.plans.computeAllPlanViews(0);
  }
  if (event.code === 'KeyR') {
    const planNames = Object.keys(viewer.plans.planLists[0]);
    if(!planNames[counter]) return;
    const current = planNames[counter];
    viewer.plans.goTo(0, current, true);
    viewer.edges.toggle("0");
    // if(!fillPosition) fillPosition = {original: fills[0].position.y, offset: fills[0].position.y + 0.01}
    // fills.forEach(fill => fill.position.y = fillPosition.offset);
  }
  if(event.code === 'KeyP') {
    counter++;
  }
  if(event.code === 'KeyO') {
    counter--;
  }
  if (event.code === 'KeyC') {
    viewer.context.ifcCamera.toggleProjection();
  }
  if (event.code === 'KeyE') {
    viewer.plans.exitPlanView(true);
    viewer.edges.toggle("0");
    // if(!fillPosition) fillPosition = {original: fills[0].position.y, offset: fills[0].position.y + 0.04}
    // fills.forEach(fill => fill.position.y = fillPosition.original);
    // viewer.edges.toggle("01");
    // fill.visible = false;
  }
};

window.onmousemove = viewer.IFC.prePickIfcItem;
window.onkeydown = handleKeyDown;
window.ondblclick = async () => {
  if(viewer.clipper.active) {
    viewer.clipper.createPlane();
  } else {
    const result = await viewer.IFC.pickIfcItem(true);
    if(!result) return;
    const {modelID, id} = result;
    const props = await viewer.IFC.getProperties(modelID, id, true, false);
    console.log(props);
  }
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

