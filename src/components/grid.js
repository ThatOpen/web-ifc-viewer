import * as THREE from 'three';
import Component from "./component";

export default class Grid extends Component {
    constructor(viewer){
        super(viewer);
        this.grid = new THREE.GridHelper();
        this.grid.material.depthTest = false;
        this.grid.renderOrder = 1;
        viewer.scene.add(this.grid);
    }
}