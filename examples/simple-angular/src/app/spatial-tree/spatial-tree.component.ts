import { Component, AfterViewInit, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { IFCPROJECT } from 'web-ifc';
import { IfcViewerAPI } from '../../../../../viewer/dist';

@Component({
  selector: 'app-spatial-tree',
  templateUrl: './spatial-tree.component.html',
  styleUrls: ['./spatial-tree.component.css']
})
export class SpatialTreeComponent implements AfterViewInit {
  @Input('ifc') ifcViewer?: IfcViewerAPI;

  spatialTree: any;
  currentModel: number;
  ifcProjects: number[];
  ifcSites: number[];
  ifcBuildings: number[];
  ifcStoreys: number[];

  constructor() {
    this.currentModel = -1;
    this.spatialTree = {};
    this.ifcProjects = [];
    this.ifcSites = [];
    this.ifcBuildings = [];
    this.ifcStoreys = [];
  }

  ngAfterViewInit(): void {}

  updateSpatialTree(modelID: number) {
    if (modelID == this.currentModel) return;
    this.currentModel = modelID;
    const ifcProjectsIds = this.ifcViewer?.getAllItemsOfType(modelID, IFCPROJECT, false);
    if (ifcProjectsIds) this.ifcProjects = ifcProjectsIds;
  }

  updateProperty(id: number, property: number[]){
    const found = { expressID: id, hasChildren: [], hasSpatialChildren: [] };
    this.ifcViewer?.getAllSpatialChildren(this.currentModel, found, false);
    console.log(found);
    property.length = 0;
    property.push(...found.hasSpatialChildren);
  }
}
