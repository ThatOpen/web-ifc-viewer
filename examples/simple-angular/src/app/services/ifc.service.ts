import { IfcViewerAPI } from 'web-ifc-viewer';

export class IfcService {
  currentModel = -1;
  ifcViewer?: IfcViewerAPI;
  container?: HTMLElement;
  onClickActions: ((modelID: number, id: number) => void)[];

  constructor() {
    this.onClickActions = [];
  }

  startIfcViewer(container: HTMLElement) {
    if (!container) return this.notFoundError('container');
    this.container = container;
    this.setupIfcScene();
    this.setupInputs();
  }

  setupIfcScene() {
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

  subscribeOnClick(action: (modelID: number, id: number) => void) {
    this.onClickActions.push(action);
  }

  private handleClick = (event: Event) => {
    const modelID = this.ifcViewer?.getModelID();
    if(typeof modelID != 'number') return;
    this.currentModel = modelID;
    this.onClickActions.forEach(action => action(modelID, -1));
  };

  private handleDoubleClick = (event: Event) => {};

  private handleMouseMove = (_event: Event) => {
    this.ifcViewer?.preselectIfcItem();
  };

  private notFoundError(item: string) {
    throw new Error(`ERROR: ${item} could not be found!`);
  }
}
