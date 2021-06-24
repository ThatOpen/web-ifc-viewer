import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

//source: https://marco.dev/angular-right-click-menu

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  menuTopLeftPosition =  {x: '0', y: '0'} 
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger?: MatMenuTrigger; 
  @Output('onAddClippingPlane') onAddClipping = new EventEmitter();
  @Output('onRemoveClippingPlane') onRemoveClipping = new EventEmitter();

  constructor() {
    this.setupEvents();
   }

  ngOnInit(): void { }

  onAddClippingPlane(event: Event){
    console.log(event);
    this.onAddClipping.emit(event);
  }

  onRemoveClippingPlane(event: Event){
    console.log(event);
    this.onRemoveClipping.emit(event);
  }

  setupEvents(){
    window.oncontextmenu = this.popup;
  }

  popup = (event: MouseEvent) => { 
    // preventDefault avoids to show the visualization of the right-click menu of the browser 
    event.preventDefault(); 
    this.matMenuTrigger?.closeMenu();
    setTimeout(() => this.openMenu(event), 200);
  } 

  openMenu(event: MouseEvent){
    if(!this.matMenuTrigger) return;
    this.menuTopLeftPosition.x = event.clientX + 'px'; 
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.openMenu(); 
  }
}
