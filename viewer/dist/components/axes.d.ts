import * as THREE from 'three';
import { Viewer } from '../core';
import { Component } from "./component";
export declare class Axes extends Component {
    axes: THREE.AxesHelper;
    constructor(viewer: Viewer, size?: number);
}
