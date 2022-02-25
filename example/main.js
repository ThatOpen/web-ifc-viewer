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
  IFCROOF,
} from 'web-ifc';
import { MeshBasicMaterial, LineBasicMaterial, Color, Vector3, BoxGeometry, Mesh, MeshLambertMaterial, BufferAttribute, BufferGeometry, Vector2 } from 'three';
import { ClippingEdges } from 'web-ifc-viewer/dist/components/display/clipping-planes/clipping-edges';
import Drawing from 'dxf-writer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(255, 255, 255) });
viewer.axes.setAxes();
viewer.grid.setGrid();
viewer.IFC.setWasmPath('files/');

viewer.IFC.loader.ifcManager.useWebWorkers(true, 'files/IFCWorker.js');

// Setup loader

const lineMaterial = new LineBasicMaterial({ color: 0x555555 });
const baseMaterial = new MeshBasicMaterial({ color: 0xffffff, side: 2 });

let first = true;
let model;
let useGLTF = false;

const loadIfc = async (event) => {
  const startTime = performance.now();

  if(useGLTF) {

    ClippingEdges.createDefaultIfcStyles = false;

    const url = URL.createObjectURL(event.target.files[0]);
    const mesh = await viewer.GLTF.loadModel(url);

    await viewer.shadowDropper.renderShadow(mesh.modelID);

    await viewer.plans.create({
      modelID: 0,
      name: "asdf",
      expressID: -1,
      normal: new Vector3(0, -1, 0),
      point: new Vector3(0, 1.5, 0),
      rotation: 0,
      ortho: true
    });

    let stylesCreated = false;
    if(!stylesCreated) {
      const models = viewer.context.items.ifcModels;
      await viewer.clipper.planes[0].edges.newStyleFromMesh('test', models);
      stylesCreated = true;
    } else {
      ClippingEdges.forceStyleUpdate = true;
    }

  } else {

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

    console.log(model);

    if(first) first = false
    else {
      ClippingEdges.forceStyleUpdate = true;
    }

    // await createFill(model.modelID);
    viewer.edges.create(`${model.modelID}`, model.modelID, lineMaterial, baseMaterial);

    await viewer.shadowDropper.renderShadow(model.modelID);

    overlay.classList.add('hidden');

  }

  const endTime = performance.now();

  console.log(`This took ${endTime - startTime} ms`);
};

const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);

// viewer.IFC.loadIfcUrl('test.ifc', true);

let fills = [];

async function createFill(modelID) {
  const wallsStandard = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCWALLSTANDARDCASE, false);
  const walls = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCWALL, false);
  const stairs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCSTAIR, false);
  const columns = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCCOLUMN, false);
  const roofs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCROOF, false);
  const slabs = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCSLAB, false);
  const ids = [...walls, ...wallsStandard, ...columns, ...stairs, ...slabs, ...roofs];
  const material = new MeshBasicMaterial({ color: 0x555555 });
  material.polygonOffset = true;
  material.polygonOffsetFactor = 10;
  material.polygonOffsetUnits = 1;
  fills.push(viewer.filler.create(`${modelID}`, modelID, ids, material));
}

viewer.shadowDropper.darkness = 1.5;

let counter = 0;

const handleKeyDown = async (event) => {
  if (event.code === 'Delete') {
    viewer.removeClippingPlane();
    viewer.dimensions.delete();
  }
  if (event.code === 'Escape') {
    viewer.IFC.selector.unpickIfcItems();
  }

  if (event.code === 'KeyF') {

    const ids = await viewer.IFC.getAllItemsOfType(0, IFCWALLSTANDARDCASE);
    const result = await viewer.GLTF.exportIfcAsGltf(model.modelID, ids);

    const blob = new Blob([result], {type: 'octet/stream'});
    const link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild( link );
    link.href = URL.createObjectURL( blob );
    link.download = "example.gltf";
    link.click();

    // _____________________________________________

    // viewer.edgesVectorizer.initializeOpenCV(cv);
    // await viewer.edgesVectorizer.vectorize(10);

    // _____________________________________________

    // const link = document.createElement('a');
    // link.href = viewer.context.renderer.newScreenshot(false, undefined, new Vector2(4000, 4000));
    // link.download = 'example.jpeg';
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
  }
  if (event.code === 'KeyR') {
    // await viewer.plans.computeAllPlanViews(0);
    // const planNames = Object.keys(viewer.plans.planLists[0]);
    // if (!planNames[counter]) return;
    // const current = planNames[counter];
    // viewer.plans.goTo(0, current, true);
    // viewer.context.items.ifcModels.forEach(model => viewer.edges.toggle(`${model.modelID}`));

    viewer.plans.goTo(0, "asdf", true);

    viewer.shadowDropper.shadows[0].root.visible = false;
    // viewer.filler.fills[0].visible = false;

  }
  if (event.code === 'KeyP') {
    counter++;
  }
  if (event.code === 'KeyO') {
    counter--;
  }
  if (event.code === 'KeyE') {
    viewer.plans.exitPlanView(true);
    viewer.edges.toggle('0');
    viewer.shadowDropper.shadows[0].root.visible = true;
    // viewer.filler.fills[0].visible = true;
  }
  if (event.code === 'KeyA') {

    useGLTF = !useGLTF;

    // PDF export

    // const currentPlans = viewer.plans.planLists[0];
    // const planNames = Object.keys(currentPlans);
    // const firstPlan = planNames[0];
    // const currentPlan = viewer.plans.planLists[0][firstPlan];
    //
    // const documentName = 'test';
    // const doc = new jsPDF('p', 'mm', [1000, 1000]);
    // viewer.pdf.newDocument(documentName, doc, 20);
    //
    // viewer.pdf.setLineWidth(documentName, 0.2);
    // viewer.pdf.drawNamedLayer(documentName, currentPlan, 'thick', 200, 200);
    //
    // viewer.pdf.setLineWidth(documentName, 0.1);
    // viewer.pdf.setColor(documentName, new Color(100, 100, 100));
    //
    // const ids = await viewer.IFC.getAllItemsOfType(0, IFCWALLSTANDARDCASE, false);
    // const subset = viewer.IFC.loader.ifcManager.createSubset({ modelID: 0, ids, removePrevious: true });
    // const edgesGeometry = new EdgesGeometry(subset.geometry);
    // const vertices = edgesGeometry.attributes.position.array;
    // viewer.pdf.draw(documentName, vertices, 200, 200);
    //
    // viewer.pdf.drawNamedLayer(documentName, currentPlan, 'thin', 200, 200);
    //
    // viewer.pdf.exportPDF(documentName, 'test.pdf');
  }
  if (event.code === 'KeyB') {
    // DXF EXPORT

    const currentPlans = viewer.plans.planLists[0];
    const planNames = Object.keys(currentPlans);
    const firstPlan = planNames[0];
    const currentPlan = viewer.plans.planLists[0][firstPlan];

    const drawingName = "example";

    viewer.dxf.initializeJSDXF(Drawing);

    viewer.dxf.newDrawing(drawingName);
    const polygons = viewer.edgesVectorizer.polygons;
    viewer.dxf.drawEdges(drawingName, polygons, 'projection', Drawing.ACI.BLUE );

    viewer.dxf.drawNamedLayer(drawingName, currentPlan, 'thick', 'section_thick', Drawing.ACI.RED);
    viewer.dxf.drawNamedLayer(drawingName, currentPlan, 'thin', 'section_thin', Drawing.ACI.GREEN);

    viewer.dxf.exportDXF(drawingName);
  }
};

window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
window.onkeydown = handleKeyDown;
window.ondblclick = async () => {

  if (viewer.clipper.active) {
    viewer.clipper.createPlane();
  } else {
    const result = await viewer.IFC.selector.pickIfcItem(true);
    console.log(result);
    // if (!result) return;
    // const { modelID, id } = result;
    // const props = await viewer.IFC.getProperties(modelID, id, true, false);
    // console.log(props);
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

