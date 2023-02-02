import { Color, GridHelper, Object3D } from 'three';
import { IfcComponent } from '../../base-types';
import { IfcContext } from '../context';
import { disposeMeshRecursively } from '../../utils/ThreeUtils';

export class IfcGrid extends IfcComponent {
  grid?: GridHelper;

  private enabled = false;

  constructor(private context: IfcContext) {
    super(context);
  }

  dispose() {
    if (this.grid) {
      disposeMeshRecursively(this.grid as any);
    }
    (this.grid as any) = null;
  }

  get active() {
    return this.enabled;
  }

  set active(state: boolean) {
    if (state && !this.grid) {
      this.setGrid();
      return;
    }

    const scene = this.context.getScene();
    // eslint-disable-next-line
    state ? scene.add(<Object3D>this.grid) : this.grid?.removeFromParent();
    this.enabled = state;
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
    this.enabled = true;
  }
}
