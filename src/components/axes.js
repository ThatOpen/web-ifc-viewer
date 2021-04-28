import * as THREE from 'three';
import Component from "./component";

export default class Axes extends Component {
    constructor(viewer, size){
        super(viewer);
        this.axes = new THREE.AxesHelper(size);
        this.axes.material.depthTest = false;
        this.axes.renderOrder = 2;
        viewer.scene.add(this.axes);
    }
}
