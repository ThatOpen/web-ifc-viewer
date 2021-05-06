
import { Axes, ClippingComponent, Edges, Grid, Viewer } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';

const viewer = new Viewer("three-canvas");
const grid = new Grid(viewer);
const axes = new Axes(viewer);
const clippingComponent = new ClippingComponent(viewer)

const edges = new Edges(viewer);

//Setup loader
const loadIfc = (event) => {
    viewer.loadIfc(event.target.files[0]);
}

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

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
