import { Color } from 'three';
import { PlanView } from '../display';

export class PDFWriter {
  documents: { [id: string]: { scale: number; drawing: any } } = {};
  private errorText = 'The specified document does not exist.';

  setLineWidth(id: string, lineWidth: number) {
    const document = this.getDocument(id);
    document.drawing.setLineWidth(lineWidth);
  }

  setColor(id: string, color: Color) {
    const document = this.getDocument(id);
    document.drawing.setTextColor(color.r, color.g, color.b);
  }

  setScale(id: string, scale: number) {
    const document = this.getDocument(id);
    document.scale = scale;
  }

  newDocument(id: string, jsPDFDocument: any, scale = 1) {
    this.documents[id] = { drawing: jsPDFDocument, scale };
  }

  drawNamedLayer(id: string, plan: PlanView, layerName: string, offsetX = 0, offsetY = 0) {
    if (!plan.plane) return;
    const layer = plan.plane.edges.edges[layerName];
    if (!layer) return;
    const coordinates = layer.generatorGeometry.attributes.position.array;
    this.draw(id, coordinates, offsetX, offsetY);
  }

  draw(id: string, coordinates: ArrayLike<number>, offsetX = 0, offsetY = 0) {
    const document = this.getDocument(id);
    const scale = document.scale;
    for (let i = 0; i < coordinates.length - 5; i += 6) {
      const start = [coordinates[i] * scale + offsetX, coordinates[i + 2] * scale + offsetY];
      const end = [coordinates[i + 3] * scale + offsetX, coordinates[i + 5] * scale + offsetY];
      // eslint-disable-next-line no-continue
      if (start[0] === 0 && start[1] === 0 && end[0] === 0 && end[1] === 0) continue;
      document.drawing.line(start[0], start[1], end[0], end[1], 'S');
    }
  }

  exportPDF(id: string, exportName: string) {
    const document = this.getDocument(id);
    document.drawing.save(exportName);
  }

  private getDocument(id: string) {
    if (!this.documents[id]) throw new Error(this.errorText);
    return this.documents[id];
  }
}
