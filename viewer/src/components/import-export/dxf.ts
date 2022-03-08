import { PlanView } from '../display';

export class DXFWriter {
  drawings: { [id: string]: any } = {};

  private Drawing: any = null;

  dispose() {
    (this.drawings as any) = null;
  }

  initializeJSDXF(drawing: any) {
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
    // flip vertical axis, so Three.js -Z becomes DXF +Y
    for (let i = 0; i < coordinates.length - 5; i += 6) {
      const start = [coordinates[i], -coordinates[i + 2]];
      const end = [coordinates[i + 3], -coordinates[i + 5]];
      // eslint-disable-next-line no-continue
      if (start[0] === 0 && start[1] === 0 && end[0] === 0 && end[1] === 0) continue;
      currentDrawing.drawLine(start[0], start[1], end[0], end[1]);
    }
  }

  drawEdges(
    drawingName: string,
    polygons: number[][],
    dxfLayerName: string,
    color: any,
    style = 'CONTINUOUS'
  ) {
    const currentDrawing = this.drawings[drawingName];
    if (!currentDrawing.layers[dxfLayerName]) {
      currentDrawing.addLayer(dxfLayerName, color, style);
    }
    currentDrawing.setActiveLayer(dxfLayerName);
    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];
      for (let j = 0; j < polygon.length - 3; j += 2) {
        const start = [polygon[j], polygon[j + 1]];
        const end = [polygon[j + 2], polygon[j + 3]];
        currentDrawing.drawPolyline([start, end]);
      }
    }
  }

  exportDXF(drawingName: string) {
    const currentDrawing = this.drawings[drawingName];
    if (!currentDrawing) throw new Error(`There is no drawing with id: ${drawingName}`);
    const serialized = currentDrawing.toDxfString();
    return new Blob([serialized], { type: 'application/dxf' });
    // const saveLink = document.createElement('a');
    // saveLink.href = URL.createObjectURL(blob);
    // saveLink.download = 'data.dxf';
    // saveLink.click();
    // saveLink.remove();
  }
}
