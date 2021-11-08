import { CameraProjections, IfcViewerAPI, NavigationModes } from 'web-ifc-viewer';
import { createSideMenuButton } from './utils/gui-creator';
import { IFCSPACE, IFCSTAIR, IFCCOLUMN, IFCWALLSTANDARDCASE, IFCWALL, IFCSLAB, IFCOPENINGELEMENT } from 'web-ifc';
import {
  Raycaster,
  Mesh,
  BoxGeometry,
  BackSide,
  Vector3,
  Plane,
  MeshBasicMaterial,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Color
} from 'three';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(255, 255, 255) });
viewer.addAxes();
viewer.addGrid(300, 300);
viewer.IFC.setWasmPath('files/');
viewer.IFC.loader.ifcManager.applyWebIfcConfig({
  COORDINATE_TO_ORIGIN: true,
  USE_FAST_BOOLS: false
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

  // viewer.context.renderer.usePostproduction = true;

  const model = await viewer.IFC.loadIfc(event.target.files[0], true);
  if (!model) return;
  overlay.classList.add('hidden');
}

  // model.material.forEach(mat => {
  //  mat.polygonOffset = true;
  //  mat.polygonOffsetFactor = 1;
  //  mat.polygonOffsetUnits = 1;
  // })

  // const planes = viewer.context.getClippingPlanes();
  //
  // const wallsStandard = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCWALLSTANDARDCASE, false);
  // const walls = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCWALL, false);
  // // const stairs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCSTAIR, false);
  // const columns = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCCOLUMN, false);
  // // const slabs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(0, IFCSLAB, false);

  // const subset = viewer.IFC.loader.ifcManager.createSubset({
  //   modelID: 0,
  //   ids: [...walls, ...wallsStandard, ...columns],
  //   scene: viewer.context.getScene(),
  //   removePrevious: true,
  //   material: new MeshBasicMaterial({
  //     color: 0x000000,
  //     side: BackSide,
  //     clippingPlanes: planes,
  //     polygonOffset: true,
  //     polygonOffsetFactor: -1,
  //     polygonOffsetUnits: 1})
  // });
  //
  //
  // subset.position.y += 0.1;

  // if(subset) subset.geometry.computeVertexNormals();


  // viewer.context.scene.removeModel(model);
  // viewer.context.scene.addModel(subset);

  // mesh
  // const whiteMaterial = new MeshBasicMaterial( {
  //   color: 0xffffff,
  //   polygonOffset: true,
  //   polygonOffsetFactor: 1,
  //   polygonOffsetUnits: 1,
  //   clippingPlanes: planes
  // } );
  //
  // model.material = model.material.map(mat => whiteMaterial)

// wireframe
//   const geo = new EdgesGeometry( model.geometry );
//   const mat = new LineBasicMaterial( { color: 0x000000, clippingPlanes: planes } );
//   const wireframe = new LineSegments( geo, mat );
//   console.log(wireframe);
//   model.add( wireframe );
// };

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);
document.body.appendChild(inputElement);

// viewer.IFC.loadIfcUrl('test.ifc', true);

const baseRotation = Math.PI / 2;
const controls = viewer.context.ifcCamera.cameraControls;

const handleKeyDown = (event) => {
  if (event.code === 'Delete') {
    viewer.removeClippingPlane();
    viewer.dimensions.delete()
  }
  if (event.code === 'KeyO') {
    viewer.context.getIfcCamera().toggleProjection();
  }
  if (event.code === 'KeyC') {
    controls.setLookAt(0, 10, 0, 0, 0, 0, true);
  }
  if (event.code === 'KeyP') {
    viewer.context.ifcCamera.setNavigationMode(NavigationModes.FirstPerson);
  }
  if (event.code === 'KeyL') {
    viewer.context.ifcCamera.setNavigationMode(NavigationModes.Orbit);
  }
  if (event.code === 'KeyR') {
    controls.rotateAzimuthTo(baseRotation, true);
  }
  if (event.code === 'KeyK') {
    // ExportToSVG('Hi.dxf');
  }
};

window.onmousemove = viewer.IFC.prePickIfcItem;
window.onkeydown = handleKeyDown;
window.ondblclick = async () => {
  // viewer.clipper.createPlane();
  viewer.IFC.pickIfcItem(true);
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

