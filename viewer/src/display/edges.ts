import * as THREE from 'three';
import { Component } from '../components';
import { Viewer } from '../core';

export const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x555555
});

export const whiteMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff, side: THREE.DoubleSide
});

export const invisibleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0
});

//TODO: Merge all wireframes in single object
//TODO: Create all wireframes on init async

export interface EdgesIfcObject extends THREE.Mesh {
    ifcMaterial: THREE.Material | THREE.Material[],
    wireframe: THREE.LineSegments
}

export class Edges extends Component {

    active: boolean = false;

    constructor(viewer: Viewer) {
        super(viewer);
    }

    activateEdgeDisplay = () => {
        this.active = true;
        this.viewer.ifcObjects.forEach((object) => {
            object.traverse((item) => {
                if (item.type === 'Mesh') {
                    const mesh = item as EdgesIfcObject;

                    if (!mesh.ifcMaterial)
                        mesh.ifcMaterial = mesh.material;

                    mesh.wireframe ? (mesh.wireframe.visible = true) : (mesh.wireframe = this.getEdges(mesh));
                    mesh.add(mesh.wireframe);

                    // @ts-ignore
                    if (!mesh.isSelected) {
                        // @ts-ignore
                        mesh.material = mesh.material.transparent ? invisibleMaterial : whiteMaterial;
                    }
                }
            });
        });
    };

    deactivateEdgeDisplay = () => {
        this.active = false;
        this.viewer.ifcObjects.forEach((object) => {
            object.traverse((item) => {
                if (item.type === 'Mesh') {
                    const mesh = item as EdgesIfcObject;
                    // @ts-ignore
                    if (mesh.wireframe)
                        mesh.wireframe.visible = false;
                    // @ts-ignore
                    if (!mesh.isSelected)
                        mesh.material = mesh.ifcMaterial;
                }
            });
        });
    }

    getEdges = (item: THREE.Mesh) => {
        const geometry = new THREE.EdgesGeometry(item.geometry);
        return new THREE.LineSegments(geometry, lineMaterial);
    }
}