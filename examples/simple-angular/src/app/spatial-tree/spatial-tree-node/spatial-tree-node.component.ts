import { Component, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { IfcViewerAPI } from '../../../../../../viewer/dist';

@Component({
  selector: 'app-spatial-tree-node',
  templateUrl: './spatial-tree-node.component.html',
  styleUrls: ['./spatial-tree-node.component.css']
})
export class SpatialTreeNodeComponent implements AfterContentInit {
  @Input('currentModel') currentModel: number;
  @Input('ifcID') ifcID: number;
  @Input('prefix') prefix: string;
  @Input('rootNode') rootNode: boolean;
  @Input('ifc') ifcViewer?: IfcViewerAPI;
  // @Output('onSelect') onSelect = new EventEmitter();
  props: object;
  spatialChildren: number[];
  clicked: boolean;

  constructor() {
    this.ifcID = -1;
    this.currentModel = -1;
    this.clicked = false;
    this.rootNode = false;
    this.spatialChildren = [];
    this.props = {};
    this.prefix = '';
  }

  ngAfterContentInit(): void {}

  loadChildren() {
    this.clicked = true;
    // this.onSelect.emit(this.ifcID);
    const found = { expressID: this.ifcID, hasChildren: [], hasSpatialChildren: [] };
    this.ifcViewer?.getAllSpatialChildren(this.currentModel, found, false, true);
    console.log(found);
    this.spatialChildren = found.hasSpatialChildren;
  }
}
