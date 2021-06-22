import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { IfcViewerAPI } from 'web-ifc-viewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ifcjs-angular-example';
  viewer?: IfcViewerAPI;
  @ViewChild('sidenav', {static: true}) serverContentInput?: MatSidenav;

  ngOnInit(){

    if(this.serverContentInput) this.serverContentInput.close();
    
    const container = document.getElementById("viewer-container")!;
    this.viewer = new IfcViewerAPI({container});
    console.log(this.viewer);
    this.viewer.addAxes();
    this.viewer.addGrid();
    this.viewer.setWasmPath("assets/");

    // const url = "https://raw.githubusercontent.com/IFCjs/test-ifc-files/main/Revit/TESTED_Simple_project_01.ifc";
    // this.viewer.loadIfcUrl(url);
    
    //Setup loader
    // const loadIfc = async (event) => {
    //    await viewer.loadIfc(event.target.files[0], true);
    // }
    
    // const inputElement = document.createElement('input');
    // inputElement.setAttribute('type', 'file');
    // inputElement.classList.add('hidden');
    // inputElement.addEventListener('change', loadIfc, false);
    // document.body.appendChild(inputElement);
    
    // const handleKeyDown = (event) => {
    //     viewer.removeClippingPlane();
    // };
    
    // window.onmousemove = viewer.preselectIfcItem;
    // window.onkeydown = handleKeyDown;
    // window.ondblclick = viewer.addClippingPlane;
    
    //Setup UI
    // const loadButton = createSideMenuButton('./resources/folder-icon.svg');
    //     loadButton.addEventListener('click', () => {
    //     loadButton.blur();
    //     inputElement.click();
    // });
    
    // const sectionButton = createSideMenuButton('./resources/section-plane-down.svg');
    // sectionButton.addEventListener('click', () => {
    //     sectionButton.blur();
    //     viewer.toggleClippingPlanes();
    // });
    
    // const dropBoxButton = createSideMenuButton('./resources/dropbox-icon.svg');
    // dropBoxButton.addEventListener('click', () => {
    //     dropBoxButton.blur();
    //     viewer.openDropboxWindow();
    // });
  }

  loadIfc(file: File){
    this.viewer?.loadIfc(file);
  }
}
