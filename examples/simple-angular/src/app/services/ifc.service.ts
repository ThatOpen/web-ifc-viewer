import { IfcViewerAPI } from 'web-ifc-viewer';

export class IfcService {
  ifcViewer?: IfcViewerAPI;
  container?: HTMLElement;

  startIfcViewer(container: HTMLElement) {
    if (!container) return this.notFoundError('container');
    this.container = container;
    this.setupIfcScene();
    this.setupInputs();
  }

  setupIfcScene(){
    if (!this.container) return;
    this.ifcViewer = new IfcViewerAPI({ container: this.container });
    this.ifcViewer.addAxes();
    this.ifcViewer.addGrid();
    this.ifcViewer.addStats('position:absolute;bottom:0px;left:0px;z-index:1;');
    this.ifcViewer.setWasmPath('assets/');
  }

  setupInputs() {
    if (!this.container) return;
    this.container.onclick = this.handleClick;
    this.container.ondblclick = this.handleDoubleClick;
    this.container.onmousemove = this.handleMouseMove;
  }

  private handleClick = (event: Event) => {
    const id = this.ifcViewer?.getModelID();
    // if (typeof id === 'number') this.spatialTree?.updateSpatialTree(id);
  };

  private handleDoubleClick = (event: Event) => {};

  private handleMouseMove = (_event: Event) => {
    this.ifcViewer?.preselectIfcItem();
  };

  private notFoundError(item: string) {
    throw new Error(`ERROR: ${item} could not be found!`);
  }
}
