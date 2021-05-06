import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { Component } from '../components';
import { Viewer } from '../core';
export declare class ClippingComponent extends Component {
    dragging: boolean;
    enabled: boolean;
    planes: Plane[];
    scene: THREE.Scene;
    camera: THREE.Camera;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    intersection: THREE.Intersection | undefined;
    constructor(viewer: Viewer);
    set active(state: boolean);
    get active(): boolean;
    handleMouseMove: (event: MouseEvent) => void;
    handleDblClick: () => void;
    handleKeyDown: (event: KeyboardEvent) => void;
    createPlaneFromRaycaster: () => void;
    createPlaneFromIntersection: (intersection: THREE.Intersection) => void;
    updateMaterials: () => void;
    deletePlane: (plane: Plane) => void;
}
declare class Plane extends Component {
    _visible: boolean;
    _plane: THREE.Plane;
    _constant: number;
    _control_object: THREE.Object3D;
    _transform_controls: TransformControls;
    _planeGeometry: THREE.PlaneGeometry;
    _planeMaterial: THREE.Material;
    _planeMesh: THREE.Mesh;
    scene: THREE.Scene;
    camera: THREE.Camera;
    constructor(viewer: Viewer, origin: THREE.Vector3, normal: THREE.Vector3, onStartDragging: Function, onEndDragging: Function);
    get plane(): THREE.Plane;
    get planeMesh(): THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
    get visible(): boolean;
    set visible(visible: boolean);
    removeFromScene: () => void;
}
export {};
