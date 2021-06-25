import { Component, AfterViewInit, Input } from '@angular/core';
import { IFCPROJECT } from 'web-ifc';
import { IfcViewerAPI } from '../../../../../viewer/dist';
// import { MatMenuTrigger } from '@angular/material/menu';

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
  ifcProducts: {[key: number]: number[]};
  spatialChildren: {[key: number]: number[]};

  constructor() {
    this.currentModel = -1;
    this.spatialTree = {};
    this.ifcProjects = [];
    this.ifcSites = [];
    this.ifcBuildings = [];
    this.ifcStoreys = [];
    this.ifcProducts = {};
    this.spatialChildren = {};
  }

  ngAfterViewInit(): void {}

  updateSpatialTree(modelID: number) {
    if (modelID == this.currentModel) return;
    this.currentModel = modelID;
    const ifcProjectsIds = this.ifcViewer?.getAllItemsOfType(modelID, IFCPROJECT, false);
    if (ifcProjectsIds) this.ifcProjects = ifcProjectsIds;
  }

  // getSpatialChildren(id: number, spatialChildren: number[]){
  //   const found = { expressID: id, hasChildren: [], hasSpatialChildren: [] };
  //   this.ifcViewer?.getAllSpatialChildren(this.currentModel, found, false, true);
  //   console.log(found);
  //   if(spatialChildren != undefined){
  //     spatialChildren.length = 0;
  //     spatialChildren.push(...found.hasSpatialChildren);
  //   }
  //   this.ifcProducts[id] = found.hasChildren;
  // }
}
