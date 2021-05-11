import {Viewer} from '../core';

export abstract class Component {

    viewer: Viewer;

    protected constructor(viewer: Viewer){
        viewer.addComponent(this);
        this.viewer = viewer;
    }

    update(_delta: number) { };
}