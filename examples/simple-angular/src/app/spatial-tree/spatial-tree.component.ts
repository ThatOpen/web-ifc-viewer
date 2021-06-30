import { IfcService } from '../services/ifc.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface SpatialNode {
  name: string;
  children?: SpatialNode[];
}

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-spatial-tree',
  templateUrl: './spatial-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./spatial-tree.component.css']
})
export class SpatialTreeComponent {
  treeControl = new NestedTreeControl<SpatialNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<SpatialNode>();
  spatialTree:any = {};
  currentModel: number = -1;
  ifc: IfcService;

  constructor(service: IfcService) {
    this.dataSource.data = [];
    this.ifc = service;
    this.ifc.subscribeOnSelect(this.updateSpatialTree);
  }

  hasChild = (_: number, node: SpatialNode) => !!node.children && node.children.length > 0;

  updateSpatialTree = (modelID: number, id: number) => {
    if (modelID == this.currentModel) return;
    this.currentModel = modelID;
    const ifcTree = this.ifc.ifcViewer?.getSpatialStructure(modelID) as any;
    this.dataSource.data = [ifcTree];
  };

  onClick(event: any){
    event.modelID = this.currentModel;
    this.ifc.select(this.currentModel, event.expressID);
  }
}
