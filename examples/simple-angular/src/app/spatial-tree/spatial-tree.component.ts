import { Component, Input } from '@angular/core';
import { IFCPROJECT } from 'web-ifc';
import { IfcViewerAPI } from '../../../../../viewer/dist';
import { IfcService } from '../services/ifc.service';
// import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-spatial-tree',
  templateUrl: './spatial-tree.component.html',
  styleUrls: ['./spatial-tree.component.css']
})
export class SpatialTreeComponent {
  ifc: IfcService;
  currentModel: number;
  ifcProjects: number[];

  constructor(service: IfcService) {
    this.ifc = service;
    this.currentModel = -1;
    this.ifcProjects = [];
    this.ifc.subscribeOnClick(this.updateSpatialTree);
  }

  updateSpatialTree = (modelID: number, id: number) => {
    if (modelID == this.currentModel) return;
    this.currentModel = modelID;
    const ifcProjectsIds = this.ifc.ifcViewer?.getAllItemsOfType(modelID, IFCPROJECT, false);
    if (ifcProjectsIds) this.ifcProjects = ifcProjectsIds;
  }
}
