import { Component, AfterContentInit, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { IfcViewerAPI } from '../../../../../viewer/dist';

@Component({
  selector: 'app-spatial-tree',
  templateUrl: './spatial-tree.component.html',
  styleUrls: ['./spatial-tree.component.css']
})
export class SpatialTreeComponent implements AfterContentInit {
  @Input('ifc') ifcViewer?: IfcViewerAPI;
  spatialTree: any;
  currentModel?: number;

  constructor() {
    this.currentModel = -1;
    this.spatialTree = {};
  }

  ngAfterContentInit(): void {}

  updateSpatialTree(modelID: number) {
    if (modelID == this.currentModel) return;
    this.currentModel = modelID;
    const rawTree = this.ifcViewer?.getSpatialStructure(modelID, false);
    this.spatialTree = this.createTreeBranche(rawTree);
    console.log(this.spatialTree);
  }

  createTreeBranche(item: any) {
    const name = item.__proto__.constructor.name;
    const properties = this.getProperties(item);
    const spatialChildren = item.hasSpatialChildren.map((child: any) => this.createTreeBranche(child));
    const children = item.hasChildren;
    return {name, properties, spatialChildren, children};
  }

  getGuid(item: any) {
    if (item.GlobalId) return item.GlobalId.value as string;
    return '';
  }

  getProperties(item: any) {
    if (!item) return '';
    const result: any = [];
    Object.keys(item).forEach((i) => {
      if (i != 'hasChildren' && i != 'hasSpatialChildren')
        result.push({ name: i, value: this.getValue(item[i]) });
    });
    return result;
  }

  getValue(prop: any) {
    if (prop === null || prop === undefined) return 'undefined';
    if (typeof prop === 'number') return prop;
    if (Array.isArray(prop)) return prop.map(p => p.value);
    if (typeof prop === 'string' && prop.length > 0) return prop;
    if (typeof prop === 'object' && prop.value) return prop.value;
    return 'undefined';
  }
}
