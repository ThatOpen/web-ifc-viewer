import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IfcService } from '../services/ifc.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  clippingActive: boolean;
  ifc: IfcService;

  private fileOpener: HTMLInputElement;

  constructor(service: IfcService) {
    this.ifc = service;
    this.clippingActive = false;
    this.fileOpener = this.newFileOpener();
  }

  ngOnInit(): void {}

  onOpenIfc() {
    this.fileOpener.click();
  }

  onActivateClipping(){
    this.clippingActive = !this.clippingActive;
    this.ifc.ifcViewer?.toggleClippingPlanes();
  }

  private loadIfc = async (event: any) => {
    const file = event.target.files[0];
    if(!file) return;
    this.ifc.ifcViewer?.loadIfc(file);
  };

  private newFileOpener() {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'file');
    inputElement.classList.add('hidden');
    inputElement.addEventListener('change', this.loadIfc, false);
    document.body.appendChild(inputElement);
    return inputElement;
  }
}
