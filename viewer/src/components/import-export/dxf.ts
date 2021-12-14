import { PlanView } from '../display';

export class DXFWriter {
  drawings: { [id: string]: any } = {};

  private Drawing: any = null;

  initializeJSPDF(drawing: any) {
    this.Drawing = drawing;
  }

  newDrawing(drawingName: string, units = 'Meters') {
    if (this.Drawing === null) {
      throw new Error('You must pass the dxf-writer drawing object as parameter');
    }
    this.drawings[drawingName] = new this.Drawing();
    this.drawings[drawingName].setUnits(units);
  }

  drawNamedLayer(
    drawingName: string,
    plan: PlanView,
    layerName: string,
    dxfLayerName: string,
    color: any,
    style = 'CONTINUOUS'
  ) {
    if (!plan.plane) return;
    const layer = plan.plane.edges.edges[layerName];
    if (!layer) return;
    const coordinates = layer.generatorGeometry.attributes.position.array;
    this.draw(drawingName, coordinates, dxfLayerName, color, style);
  }

  draw(
    drawingName: string,
    coordinates: ArrayLike<number>,
    dxfLayerName: string,
    color: any,
    style = 'CONTINUOUS'
  ) {
    const currentDrawing = this.drawings[drawingName];
    if (!currentDrawing.layers[dxfLayerName]) {
      currentDrawing.addLayer(dxfLayerName, color, style);
    }
    currentDrawing.setActiveLayer(dxfLayerName);
    for (let i = 0; i < coordinates.length - 5; i += 6) {
      const start = [coordinates[i], coordinates[i + 2]];
      const end = [coordinates[i + 3], coordinates[i + 5]];
      // eslint-disable-next-line no-continue
      if (start[0] === 0 && start[1] === 0 && end[0] === 0 && end[1] === 0) continue;
      currentDrawing.drawLine(start[0], start[1], end[0], end[1]);
    }
  }

  exportDXF(drawingName: string) {
    const currentDrawing = this.drawings[drawingName];
    if (!currentDrawing) throw new Error(`There is no drawing with id: ${drawingName}`);
    const saveLink = document.createElement('a');
    const serialized = currentDrawing.toDxfString();
    const blob = new Blob([serialized], { type: 'application/dxf' });
    saveLink.href = URL.createObjectURL(blob);
    saveLink.download = 'data.dxf';
    saveLink.click();
  }
}

//
// export async function exportPDF(subset) {
//   Default;
// export
//   is;
//   a4;
//   paper, portrait, using;
//   millimeters;
//   for units
//       const doc = new jsPDF('p', 'mm', [1000, 1000]);
//
//   const edgesGeometry = new EdgesGeometry(subset.geometry);
//   console.log(edgesGeometry);
//   const allAttributes = Object.values(ClippingEdges.styles).map(style => style.generatorGeometry.attributes);
//   drawPDFLayer(doc, allAttributes[0].position.array, 300, 250, 8, 0.3);
//   drawPDFLayer(doc, allAttributes[1].position.array, 300, 250, 8, 0.1, { r: 200, g: 200, b: 200 });
//   drawPDFLayer(doc, edgesGeometry.attributes.position.array, 300, 250, 8, 0.1, { r: 220, g: 220, b: 220 });
//   doc.save('a4.pdf');
// }
//
// function drawPDFLayer(doc, coordinates, offsetX, offsetY, scale = 1, lineWidth = 0.2, color = { r: 0, g: 0, b: 0 }) {
//   doc.setLineWidth(lineWidth);
//   doc.setTextColor(color.r, color.g, color.b);
//   for (let i = 0; i < coordinates.length - 5; i += 6) {
//     const start = [coordinates[i] * scale + offsetX, coordinates[i + 2] * scale + offsetY];
//     const end = [coordinates[i + 3] * scale + offsetX, coordinates[i + 5] * scale + offsetY];
//     if (start[0] === 0 && start[1] === 0 && end[0] === 0 && end[1] === 0) continue;
//     doc.line(start[0], start[1], end[0], end[1], 'S');
//   }
// }
