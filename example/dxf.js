import Drawing from 'dxf-writer'
import { ClippingEdges } from 'web-ifc-viewer/dist/components/display/clipping-planes/clipping-edges';

let d = new Drawing();
d.setUnits('Meters');

export function exportDXF() {
  const allAttributes =  Object.values(ClippingEdges.styles).map(style => style.generatorGeometry.attributes);
  drawLayer(allAttributes[0], "Section", Drawing.ACI.RED)
  drawLayer(allAttributes[1], "Projection", Drawing.ACI.GREEN)
  saveFile();
}

function drawLayer(attributes, name, color, style = 'CONTINUOUS') {
  // d.addLayer(name, Drawing.ACI.GREEN, 'CONTINUOUS');
  d.addLayer(name, color, style);
  d.setActiveLayer(name);
  const coordinates = attributes.position.array;
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

