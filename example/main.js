import { CameraProjections, IfcViewerAPI, NavigationModes } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import { IFCSPACE, IFCSTAIR, IFCCOLUMN, IFCWALLSTANDARDCASE, IFCWALL, IFCSLAB, IFCOPENINGELEMENT } from 'web-ifc';
import {
  Vector3,
  MeshBasicMaterial,
  LineBasicMaterial
} from 'three';
import { updateModel } from './conditional-lines/edges';

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
let fill;
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
  model.material.forEach(mat => mat.side = 2);

  // createFill();
  // viewer.edges.create("01", 0, new LineBasicMaterial({color: 0x000000}), new MeshBasicMaterial({color: 0xffffff, side: 2}));

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
//   fill = viewer.fills.create('example', 0, ids, new MeshBasicMaterial({color: 0x000000}));
//   if(fill) {
//     fill.position.y += 0.01;
//   }
//   fill.visible = false;
// }

// async function goToFirstFloor() {
//   await viewer.plans.computeAllPlanViews(0);
//   const firstFloor = viewer.plans.getAll()[0];
//   await viewer.plans.goTo(firstFloor);
// }

const handleKeyDown = (event) => {
  if (event.code === 'Delete') {
    viewer.removeClippingPlane();
    viewer.dimensions.delete()
  }
  if (event.code === 'KeyO') {
    viewer.context.getIfcCamera().toggleProjection();
  }
  if (event.code === 'KeyR') {
    viewer.context.renderer.usePostproduction = !viewer.context.renderer.usePostproduction;
  }
  // if (event.code === 'KeyC') {
  //   goToFirstFloor();
  //   viewer.edges.toggle("01");
  //   fill.visible = true;
  // }
  // if (event.code === 'KeyE') {
  //   viewer.plans.exitPlanView(true);
  //   viewer.edges.toggle("01");
  //   fill.visible = false;
  // }
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

