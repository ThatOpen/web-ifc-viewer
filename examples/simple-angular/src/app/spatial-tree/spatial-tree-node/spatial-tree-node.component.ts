import { Component, AfterContentInit, Input } from '@angular/core';

@Component({
  selector: 'app-spatial-tree-node',
  templateUrl: './spatial-tree-node.component.html',
  styleUrls: ['./spatial-tree-node.component.css']
})
export class SpatialTreeNodeComponent implements AfterContentInit {

  @Input('ifcID') ifcID: number;
  @Input('prefix') prefix: string;
  props: object;

  constructor() { 
    this.props = {};
    this.prefix = "";
    this.ifcID = -1;
  }

  ngAfterContentInit(): void {
    
  }

}
