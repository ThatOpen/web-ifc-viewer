import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { IfcService } from '../services/ifc.service';

//source: https://marco.dev/angular-right-click-menu

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {
  ifc: IfcService;
  menuTopLeftPosition = { x: '0', y: '0' };
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger?: MatMenuTrigger;

  constructor(service: IfcService) {
    this.ifc = service;
    this.setupEvents();
  }

  onAddClippingPlane() {
    this.ifc.ifcViewer?.addClippingPlane();
  }

  onRemoveClippingPlane() {
    this.ifc.ifcViewer?.removeClippingPlane();
  }

  private setupEvents() {
    window.oncontextmenu = this.popup;
  }

  private popup = (event: MouseEvent) => {
    // Avoids the default right-click menu of the browser
    event.preventDefault();
    this.matMenuTrigger?.closeMenu();
    setTimeout(() => this.openMenu(event), 200);
  };

  private openMenu(event: MouseEvent) {
    if (!this.matMenuTrigger) return;
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.openMenu();
  }
}
