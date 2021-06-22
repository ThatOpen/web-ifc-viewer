import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output('onOpenIfc') onOpenIfc = new EventEmitter();

  private fileOpener: HTMLInputElement;

  constructor() {
    this.fileOpener = this.newFileOpener();
  }

  ngOnInit(): void {}

  openIfc() {
    this.fileOpener.click();
  }

  loadIfc = async (event: any) => {
    const file = event.target.files[0];
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
