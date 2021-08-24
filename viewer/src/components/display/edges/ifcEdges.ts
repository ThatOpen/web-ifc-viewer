import {
  Mesh,
  LineSegments,
  LineBasicMaterial,
  EdgesGeometry
} from 'three';
import { IfcComponent, Context } from '../../../base-types';

export class IfcEdges extends IfcComponent {
  context: Context;

  private lineMaterial = new LineBasicMaterial({
    color: 0x888888
  });

  constructor(context: Context) {
    super(context);
    this.context = context;
  }

  set edgesMaterial(newMaterial: LineBasicMaterial) {
    this.lineMaterial = newMaterial;
  }

  toggleEdges = (modelIDs: number[], active: boolean) => {
    this.context.items.ifcModels.forEach((ifcModel) => {
      if (!modelIDs.includes(ifcModel.modelID)) return;
      if (!active && ifcModel.userData.wireframe) {
        ifcModel.remove(ifcModel.userData.wireframe);
        return;
      }
      if (!ifcModel.userData.wireframe) ifcModel.userData.wireframe = this.getEdges(ifcModel);
      ifcModel.add(ifcModel.userData.wireframe);
    });
  };

  private getEdges = (item: Mesh) => {
    const geometry = new EdgesGeometry(item.geometry);
    return new LineSegments(geometry, this.lineMaterial);
  };
}
