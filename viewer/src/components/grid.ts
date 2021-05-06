import * as THREE from 'three';
import { Component } from "./component";
import {Viewer} from '../core';

export class Grid extends Component {

    grid: THREE.GridHelper;

    constructor(viewer: Viewer, size?: number, divisions?: number, colorCenterLine?: THREE.Color, colorGrid?: THREE.Color){
        super(viewer);
        this.grid = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
        (this.grid.material as THREE.Material).depthTest = false;
        this.grid.renderOrder = 0;
        viewer.scene.add(this.grid);
    }
}