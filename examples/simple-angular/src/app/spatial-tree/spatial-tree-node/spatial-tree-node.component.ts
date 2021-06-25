import { Component, Input, AfterContentInit, EventEmitter } from '@angular/core';
import { IfcService } from 'src/app/services/ifc.service';
import { IfcViewerAPI } from '../../../../../../viewer/dist';

@Component({
  selector: 'app-spatial-tree-node',
  templateUrl: './spatial-tree-node.component.html',
  styleUrls: ['./spatial-tree-node.component.css']
})
export class SpatialTreeNodeComponent implements AfterContentInit {
  @Input('ifcID') ifcID: number = -1;
  @Input('rootNode') rootNode: boolean = false;
  @Input('spatialIndex') spatialIndex?: number;

  ifc: IfcService;
  name: string = '';
  props: any = {};
  spatialChildren: number[] = [];
  children: number[] = [];
  clicked: boolean = false;
  spatialStructure: string[] = [
    'IfcProject',
    'IfcSite',
    'IfcBuilding',
    'IfcBuildingStorey',
    'IfcSpace'
  ];

  constructor(service: IfcService) {
    this.ifc = service;
  }

  ngAfterContentInit() {
    if (this.spatialIndex) this.name = this.spatialStructure[this.spatialIndex] || 'IfcItem';
  }

  loadChildren() {
    this.clicked = true;
    const found = { expressID: this.ifcID, hasChildren: [], hasSpatialChildren: [] };
    this.ifc.ifcViewer?.getAllSpatialChildren(this.ifc.currentModel, found, false, true);
    this.spatialChildren = found.hasSpatialChildren;
    this.children = found.hasChildren;
  }
}
