import * as THREE from 'three';
import { Viewer } from '../core';
import { Component } from "./component";
export declare class Grid extends Component {
    grid: THREE.GridHelper;
    constructor(viewer: Viewer);
}
