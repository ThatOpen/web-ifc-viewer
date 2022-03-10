import { IfcViewerAPI } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import {
  IFCSPACE,
  IFCOPENINGELEMENT
} from 'web-ifc';
import { MeshBasicMaterial, LineBasicMaterial, Color } from 'three';
import { ClippingEdges } from 'web-ifc-viewer/dist/components/display/clipping-planes/clipping-edges';
import Stats from 'stats.js/src/Stats';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(255, 255, 255) });
viewer.axes.setAxes();
viewer.grid.setGrid();
viewer.shadowDropper.darkness = 1.5;

// Set up stats
const stats = new Stats();
stats.showPanel(2);
document.body.append(stats.dom);
stats.dom.style.right = '0px';
stats.dom.style.left = 'auto';
viewer.context.stats = stats;

viewer.IFC.loader.ifcManager.useWebWorkers(true, 'files/IFCWorker.js');
// viewer.IFC.setWasmPath('files/');

// Setup loader

const lineMaterial = new LineBasicMaterial({ color: 0x555555 });
const baseMaterial = new MeshBasicMaterial({ color: 0xffffff, side: 2 });

let first = true;
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

    viewer.IFC.loader.ifcManager.applyWebIfcConfig({
      USE_FAST_BOOLS: true,
      COORDINATE_TO_ORIGIN: true
    })

    viewer.IFC.loader.ifcManager.parser.setupOptionalCategories({
      [IFCSPACE]: false,
      [IFCOPENINGELEMENT]: false
    });

    model = await viewer.IFC.loadIfc(event.target.files[0], false);
    model.material.forEach(mat => mat.side = 2);

    if(first) first = false
    else {
      ClippingEdges.forceStyleUpdate = true;
    }

    // await createFill(model.modelID);
    viewer.edges.create(`${model.modelID}`, model.modelID, lineMaterial, baseMaterial);

    await viewer.shadowDropper.renderShadow(model.modelID);

    overlay.classList.add('hidden');

};

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);

const handleKeyDown = async (event) => {
  if (event.code === 'Delete') {
    viewer.clipper.deletePlane();
    viewer.dimensions.delete();
  }
  if (event.code === 'Escape') {
    viewer.IFC.selector.unpickIfcItems();
  }
};

window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
window.onkeydown = handleKeyDown;
window.ondblclick = async () => {

  if (viewer.clipper.active) {
    viewer.clipper.createPlane();
  } else {
    const result = await viewer.IFC.selector.pickIfcItem(true);
    if (!result) return;
    const { modelID, id } = result;
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
  viewer.clipper.toggle();
});

const dropBoxButton = createSideMenuButton('./resources/dropbox-icon.svg');
dropBoxButton.addEventListener('click', () => {
  dropBoxButton.blur();
  viewer.dropbox.loadDropboxIfc();
});

