import { Color, GridHelper, Material, Scene } from 'three';
import { Component } from '../../base-types';

export class IfcGrid extends Component {
  grid: GridHelper;

  constructor(
    scene: Scene,
    size?: number,
    divisions?: number,
    colorCenterLine?: Color,
    colorGrid?: Color
  ) {
    super();
    this.grid = new GridHelper(size, divisions, colorCenterLine, colorGrid);
    (this.grid.material as Material).depthTest = false;
    this.grid.renderOrder = 0;
    scene.add(this.grid);
  }
}
