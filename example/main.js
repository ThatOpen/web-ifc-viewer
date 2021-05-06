
import { Axes, ClippingComponent, Viewer, createSideMenuButton, Grid,  } from 'web-ifc-viewer';

const viewer = new Viewer("three-canvas");
const grid = new Grid(viewer);
const axes = new Axes(viewer);
const clippingComponent = new ClippingComponent(viewer)

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

