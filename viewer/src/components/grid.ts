import * as THREE from 'three';
import { Component } from "./component";
import {Viewer} from '../core';

export class Grid extends Component {

    grid: THREE.GridHelper;

    constructor(viewer: Viewer){
        super(viewer);
        this.grid = new THREE.GridHelper();
        (this.grid.material as THREE.Material).depthTest = false;
        this.grid.renderOrder = 1;
        viewer.scene.add(this.grid);
    }
}