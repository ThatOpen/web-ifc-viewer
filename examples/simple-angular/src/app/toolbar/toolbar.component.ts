import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  clippingActive: boolean;
  @Output('onOpenIfc') onOpenIfc = new EventEmitter();
  @Output('onActivateClipping') onActivateClipping = new EventEmitter();

  private fileOpener: HTMLInputElement;

  constructor() {
    this.clippingActive = false;
    this.fileOpener = this.newFileOpener();
  }

  ngOnInit(): void {}

  openIfc() {
    this.fileOpener.click();
  }

  activateClipping(){
    this.clippingActive = !this.clippingActive;
    this.onActivateClipping.emit();
  }

  private loadIfc = async (event: any) => {
    const file = event.target.files[0];
    if(!file) return;
    this.onOpenIfc.emit(file);
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
