import { Color, GridHelper } from 'three';
import { IfcComponent, Context } from '../../base-types';

export class IfcGrid extends IfcComponent {
  grid: GridHelper;

  constructor(
    context: Context,
    size?: number,
    divisions?: number,
    colorCenterLine?: Color,
    colorGrid?: Color
  ) {
    super(context);
    this.grid = new GridHelper(size, divisions, colorCenterLine, colorGrid);
    // (this.grid.material as Material).depthTest = false;
    this.grid.renderOrder = 0;
    const scene = context.getScene();
    scene.add(this.grid);
  }
}
