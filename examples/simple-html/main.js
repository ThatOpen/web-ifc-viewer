import { Axes, ClippingComponent, DropboxAPI, Edges, Grid, Viewer } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import { BcfReader} from '@parametricos/bcf-js';

const container = document.getElementById("viewer-container");
const viewer = new Viewer(container);
const grid = new Grid(viewer, 100, 100);
const axes = new Axes(viewer);
const clippingComponent = new ClippingComponent(viewer);
const dropBoxAPI = new DropboxAPI(viewer);

const edges = new Edges(viewer);

//Setup loader
const loadIfc = (event) => {
    viewer.loadIfc(event.target.files[0]);
}

const loadBcf = async (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    const reader = new BcfReader();
    await reader.read(url);
    console.log(reader.topics)
}

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

const bcfInputElement = document.createElement('input');
bcfInputElement.setAttribute('type', 'file');
bcfInputElement.classList.add('hidden');
bcfInputElement.addEventListener('change', loadBcf, false);
document.body.appendChild(bcfInputElement);

//Setup UI
const loadButton = createSideMenuButton('./resources/folder-icon.svg');
    loadButton.addEventListener('click', () => {
    loadButton.blur();
    inputElement.click();
});

const sectionButton = createSideMenuButton('./resources/section-plane-down.svg');
sectionButton.addEventListener('click', () => {
    sectionButton.blur();
    clippingComponent.active = !clippingComponent.active;
});

const edgesButton = createSideMenuButton('./resources/wireframe-cube.svg');
edgesButton.addEventListener('click', () => {
    edgesButton.blur();
    edges.active ? edges.deactivateEdgeDisplay() : edges.activateEdgeDisplay();
});

const dropBoxButton = createSideMenuButton('./resources/dropbox-icon.svg');
dropBoxButton.addEventListener('click', () => {
    dropBoxButton.blur();
    dropBoxAPI.loadDropboxIfc();
});

const loadBcfButton = createSideMenuButton('./resources/dropbox-icon.svg');
loadBcfButton.addEventListener('click', () => {
    loadBcfButton.blur();
    bcfInputElement.click();
});
