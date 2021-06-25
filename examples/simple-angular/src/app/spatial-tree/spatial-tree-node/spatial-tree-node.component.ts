import { Component, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { IfcViewerAPI } from '../../../../../../viewer/dist';

@Component({
  selector: 'app-spatial-tree-node',
  templateUrl: './spatial-tree-node.component.html',
  styleUrls: ['./spatial-tree-node.component.css']
})
export class SpatialTreeNodeComponent implements AfterContentInit {

  @Input('ifcID') ifcID: number;
  @Input('prefix') prefix: string;
  @Input('rootNode') rootNode: boolean;
  @Input('ifcViewer') ifcViewer?: IfcViewerAPI;
  @Output("onSelect") onSelect = new EventEmitter();
  props: object;
  clicked: boolean;

  constructor() { 
    this.clicked = false;
    this.rootNode = false;
    this.props = {};
    this.prefix = "";
    this.ifcID = -1;
  }

  ngAfterContentInit(): void {
    
  }

  loadChild(){
    this.clicked = true;
    this.onSelect.emit(this.ifcID);
  }

}
