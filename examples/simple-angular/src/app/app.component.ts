import { Component, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { IfcService } from './services/ifc.service';
import { SpatialTreeComponent } from './spatial-tree/spatial-tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  
  title = 'ifcjs-angular-example';
  ifc: IfcService;

  @ViewChild('spatialTree', { static: true }) spatialTree?: SpatialTreeComponent;
  @ViewChild('sidenav', { static: true }) sidenav?: MatSidenav;
  @ViewChild('threeContainer', { static: true }) container?: ElementRef;

  constructor(service: IfcService){
    this.ifc = service;
  }

  ngAfterContentInit() {
    if (this.sidenav) this.sidenav.close();
    const container = this.getContainer();
    if(container) this.ifc.startIfcViewer(container);
  }

  private getContainer() {
    if (!this.container) return null;
    return this.container.nativeElement as HTMLElement;
  }
}
