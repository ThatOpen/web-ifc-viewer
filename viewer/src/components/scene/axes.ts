import { AxesHelper, Material, Scene } from 'three';
import { Component } from '../../base-types';

export class IfcAxes extends Component {
  private axes: AxesHelper;

  constructor(scene: Scene, size?: number) {
    super();
    this.axes = new AxesHelper(size);
    (this.axes.material as Material).depthTest = false;
    this.axes.renderOrder = 2;
    scene.add(this.axes);
  }
}
