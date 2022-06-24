import { Color, GridHelper } from 'three';
import { IfcComponent } from '../../base-types';
import { IfcContext } from '../context';
import { disposeMeshRecursively } from '../../utils/ThreeUtils';

export class IfcGrid extends IfcComponent {
  grid?: GridHelper;

  constructor(private context: IfcContext) {
    super(context);
  }

  dispose() {
    if (this.grid) {
      disposeMeshRecursively(this.grid as any);
    }
    (this.grid as any) = null;
  }

  setGrid(size?: number, divisions?: number, colorCenterLine?: Color, colorGrid?: Color) {
    if (this.grid) {
      if (this.grid.parent) this.grid.removeFromParent();
      this.grid.geometry.dispose();
    }
    this.grid = new GridHelper(size, divisions, colorCenterLine, colorGrid);
    this.grid.renderOrder = 0;
    const scene = this.context.getScene();
    scene.add(this.grid);
    this.context.renderer.postProduction.excludedItems.add(this.grid);
  }
}
