import { IfcViewerAPI } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';

const container = document.getElementById("viewer-container");
const viewer = new IfcViewerAPI({container});
viewer.addAxes();
viewer.addGrid();
viewer.setWasmPath("wasm/");
// const edges = new Edges(viewer);

//Setup loader
const loadIfc = async (event) => {
   await viewer.loadIfc(event.target.files[0], true);
}

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

const handleKeyDown = (event) => {
    viewer.removeClippingPlane();
};

window.onmousemove = viewer.prepickIfcItem;
window.onkeydown = handleKeyDown;
window.ondblclick = viewer.addClippingPlane;

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