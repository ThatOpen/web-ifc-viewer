import Drawing from 'dxf-writer'
import {
  EdgesGeometry
} from 'three';
import { ClippingEdges } from 'web-ifc-viewer/dist/components/display/clipping-planes/clipping-edges';
import { jsPDF } from "jspdf";


let d = new Drawing();
d.setUnits('Meters');

export function exportDXF(model, scene, camera, renderer, subset) {

  const edgesGeometry = new EdgesGeometry(subset.geometry);
  console.log(edgesGeometry);

  const allAttributes =  Object.values(ClippingEdges.styles).map(style => style.generatorGeometry.attributes);
  drawLayer(edgesGeometry.attributes.position.array, "Projection2", Drawing.ACI.YELLOW);
  drawLayer(allAttributes[1].position.array, "Projection", Drawing.ACI.GREEN);
  drawLayer(allAttributes[0].position.array, "Section", Drawing.ACI.RED);
  saveFile();
}

function drawLayer(coordinates, name, color, style = 'CONTINUOUS') {
  // d.addLayer(name, Drawing.ACI.GREEN, 'CONTINUOUS');
  d.addLayer(name, color, style);
  d.setActiveLayer(name);
  // const coordinates = attributes.position.array;
  for(let i = 0; i < coordinates.length - 5; i += 6) {
    const start = [coordinates[i], coordinates[i + 2]];
    const end = [coordinates[i + 3], coordinates[i + 5]];
    if (start[0] === 0 && start[1] === 0 && end[0] === 0 && end[1] === 0) continue;
    d.drawLine(start[0], start[1], end[0], end[1]);
  }
}

function saveFile() {
  const saveLink = document.createElement('a');
  const blob = new Blob([d.toDxfString()], {type: "application/dxf"});
  saveLink.href  = URL.createObjectURL(blob);
  saveLink.download = "data.dxf";
  saveLink.click();
}

export async function exportPDF(subset) {
// Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF('p', 'mm', [1000, 1000]);

  const edgesGeometry = new EdgesGeometry(subset.geometry);
  // console.log(edgesGeometry);


  const allAttributes =  Object.values(ClippingEdges.styles).map(style => style.generatorGeometry.attributes);
  drawPDFLayer(doc, allAttributes[0].position.array, 300, 250, 8, 0.3);
  drawPDFLayer(doc, allAttributes[1].position.array, 300, 250, 8, 0.1, {r: 200, g: 200, b: 200});
  drawPDFLayer(doc, edgesGeometry.attributes.position.array, 300, 250, 8, 0.1, {r: 220, g: 220, b: 220});


  doc.save("a4.pdf");
}

function drawPDFLayer(doc, coordinates, offsetX, offsetY, scale = 1, lineWidth = 0.2, color = {r: 0, g: 0, b: 0}) {
  doc.setLineWidth(lineWidth);
  doc.setTextColor(color.r, color.g, color.b);
  for(let i = 0; i < coordinates.length - 5; i += 6) {
    const start = [coordinates[i] * scale + offsetX, coordinates[i + 2] * scale + offsetY];
    const end = [coordinates[i + 3] * scale + offsetX, coordinates[i + 5] * scale + offsetY];
    if (start[0] === 0 && start[1] === 0 && end[0] === 0 && end[1] === 0) continue;
    doc.line(start[0], start[1], end[0], end[1], "S");
  }
}
