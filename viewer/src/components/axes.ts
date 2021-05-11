import * as THREE from 'three';
import {Viewer} from '../core';
import { Component } from "./component";

export class Axes extends Component {

    axes: THREE.AxesHelper;

    constructor(viewer: Viewer, size?: number){
        super(viewer);
        this.axes = new THREE.AxesHelper(size);
        (this.axes.material as THREE.Material).depthTest = false;
        this.axes.renderOrder = 2;
        viewer.scene.add(this.axes);
    }
}
