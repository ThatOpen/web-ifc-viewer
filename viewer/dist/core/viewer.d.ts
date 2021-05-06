import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IfcLoader } from '../../lib/IfcLoader';
import { Component } from '../components';
export declare class IfcObject3D extends THREE.Object3D {
    isIFC?: boolean;
}
export declare class Viewer {
    components: Component[];
    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.Renderer;
    clock: THREE.Clock;
    controls: OrbitControls;
    ifcLoader: IfcLoader;
    constructor(canvasElementId: string);
    render: () => void;
    loadIfc: (file: File) => void;
    get ifcObjects(): THREE.Object3D[];
    addComponent: (component: Component) => void;
}
