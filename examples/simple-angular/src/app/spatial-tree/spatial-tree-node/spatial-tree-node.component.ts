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
  @Input('ifcViewer') ifcViewer?: IfcViewerAPI;
  @Output("onSelect") onSelect = new EventEmitter();
  props: object;

  constructor() { 
    this.props = {};
    this.prefix = "";
    this.ifcID = -1;
  }

  ngAfterContentInit(): void {
    
  }

  loadChild(){
    this.onSelect.emit(this.ifcID);
  }

}
