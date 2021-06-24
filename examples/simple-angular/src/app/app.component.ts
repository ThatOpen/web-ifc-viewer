import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { IfcViewerAPI } from 'web-ifc-viewer';
import { SpatialTreeComponent } from './spatial-tree/spatial-tree.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ifcjs-angular-example';
  ifcViewer?: IfcViewerAPI;

  @ViewChild('spatialTree', { static: true }) spatialTree?: SpatialTreeComponent;
  @ViewChild('sidenav', { static: true }) sidenav?: MatSidenav;
  @ViewChild('threeContainer', { static: true }) container?: ElementRef;

  ngOnInit() {
    if (this.sidenav) this.sidenav.close();
    this.setupScene();
    this.setupInputs();
  }

  setupScene() {
    const container = this.getContainer();
    if (!container) return this.notFoundError('container');
    this.ifcViewer = new IfcViewerAPI({ container });
    this.ifcViewer.addAxes();
    this.ifcViewer.addGrid();
    this.ifcViewer.addStats('position:absolute;bottom:0px;left:0px;z-index:1;');
    this.ifcViewer.setWasmPath('assets/');
  }

  setupInputs() {
    const container = this.getContainer();
    if (!container) return this.notFoundError('container');
    container.onclick = this.handleClick;
    container.ondblclick = this.handleDoubleClick;
    container.onmousemove = this.handleMouseMove;
  }

  activateClipping() {
    this.ifcViewer?.toggleClippingPlanes();
  }

  addClippingPlane(event: Event) {
    this.ifcViewer?.addClippingPlane();
  }

  removeClippingPlane(event: Event) {
    this.ifcViewer?.removeClippingPlane();
  }

  loadIfc(file: File) {
    this.ifcViewer?.loadIfc(file);
  }

  private handleClick = (event: Event) => {
    const id = this.ifcViewer?.getModelID();
    if (typeof id === 'number') this.spatialTree?.updateSpatialTree(id);
  };

  private handleDoubleClick = (event: Event) => {};

  private handleMouseMove = (_event: Event) => {
    this.ifcViewer?.preselectIfcItem();
  };

  private notFoundError(item: string) {
    throw new Error(`ERROR: ${item} could not be found!`);
  }

  private getContainer() {
    if (!this.container) return null;
    return this.container.nativeElement as HTMLElement;
  }
}
