import { AxesHelper, Material } from 'three';
import { IfcComponent } from '../../base-types';
import { IfcContext } from '../context';

export class IfcAxes extends IfcComponent {
  axes?: AxesHelper;

  constructor(private context: IfcContext) {
    super(context);
  }

  setAxes(size?: number) {
    if (this.axes) {
      if (this.axes.parent) this.axes.removeFromParent();
      this.axes.geometry.dispose();
    }
    this.axes = new AxesHelper(size);
    (this.axes.material as Material).depthTest = false;
    this.axes.renderOrder = 2;
    const scene = this.context.getScene();
    scene.add(this.axes);
  }
}
