import { Viewer } from '../core';
export declare abstract class Component {
    viewer: Viewer;
    constructor(viewer: Viewer);
    update(_delta: number): void;
}
