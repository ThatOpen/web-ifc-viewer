import { AxesHelper, Material } from 'three';
import { IfcComponent, Context } from '../../base-types';

export class IfcAxes extends IfcComponent {
  private axes: AxesHelper;

  constructor(context: Context, size?: number) {
    super(context);
    this.axes = new AxesHelper(size);
    (this.axes.material as Material).depthTest = false;
    this.axes.renderOrder = 2;
    const scene = context.getScene();
    scene.add(this.axes);
  }
}
