import { IfcViewerAPI } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import { IFCSPACE, IFCOPENINGELEMENT, IFCWALLSTANDARDCASE, IFCWALL, IFCSTAIR, IFCCOLUMN, IFCSLAB } from 'web-ifc';
import {MeshBasicMaterial, LineBasicMaterial, Color} from 'three';
// import { fillSection } from './section-fill';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(255, 255, 255) });
viewer.addAxes();
viewer.addGrid();
viewer.IFC.setWasmPath('files/');
viewer.IFC.loader.ifcManager.applyWebIfcConfig({
  COORDINATE_TO_ORIGIN: false,
  USE_FAST_BOOLS: true
});
// viewer.IFC.loader.ifcManager.useWebWorkers(true, 'files/IFCWorker.js');

// Setup loader
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

  // createFill();
  viewer.edges.create("01", 0, new LineBasicMaterial({color: 0x000000}), new MeshBasicMaterial({color: 0xffffff, side: 2}));

  overlay.classList.add('hidden');
}

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

// viewer.IFC.loadIfcUrl('test.ifc', true);

let fill;
async function createFill() {
  const wallsStandard = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCWALLSTANDARDCASE, false);
  const walls = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCWALL, false);
  const stairs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCSTAIR, false);
  const columns = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCCOLUMN, false);
  const slabs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCSLAB, false);
  const ids = [...walls, ...wallsStandard, ...columns, ...stairs, ...slabs];
  fill = viewer.fills.create('example', 0, ids, new MeshBasicMaterial({color: 0xffffff}));
  fill.renderOrder = 2;
  if(fill) {
    fill.position.y += 0.01;
  }
  fill.visible = false;
}

async function goToFirstFloor() {
  await viewer.plans.computeAllPlanViews(0);
  const firstFloor = viewer.plans.getAll()[0];
  await viewer.plans.goTo(firstFloor);
}

const handleKeyDown = async (event) => {
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
  if(event.code === 'KeyD') {
    // exportDXF();
    const scene = viewer.context.getScene();
    // fillSection(scene);
  }
  if (event.code === 'KeyF') {
    fill.visible = true;
  }
  if (event.code === 'KeyC') {
    await createFill();
    await goToFirstFloor();
    viewer.edges.toggle("01");
  }
  if (event.code === 'KeyE') {
    viewer.plans.exitPlanView(true);
    viewer.edges.toggle("01");
    fill.visible = false;
  }
};

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

