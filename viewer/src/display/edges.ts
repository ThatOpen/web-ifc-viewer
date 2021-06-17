import {
  Material,
  Mesh,
  LineSegments,
  LineBasicMaterial,
  DoubleSide,
  MeshBasicMaterial,
  EdgesGeometry
} from 'three';
import { Component } from '../components';
import { Viewer } from '../core';

export interface EdgesIfcObject extends Mesh {
  ifcMaterial: Material | Material[];
  wireframe: LineSegments;
}

export class Edges extends Component {
  active: boolean = false;
  private lineMaterial: Material;
  private whiteMaterial: Material;
  private invisibleMaterial: Material;

  constructor(viewer: Viewer) {
    super(viewer);

    this.lineMaterial = new LineBasicMaterial({
      color: 0x555555
    });

    this.whiteMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      side: DoubleSide
    });

    this.invisibleMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0
    });
  }

  activateEdgeDisplay = () => {
    this.active = true;
    this.viewer.ifcObjects.forEach((object) => {
      object.traverse((item) => {
        if (item.type === 'Mesh') {
          const mesh = item as EdgesIfcObject;

          if (!mesh.ifcMaterial) {
            mesh.ifcMaterial = mesh.material;
          }

          if (mesh.wireframe) mesh.wireframe.visible = true;
          else mesh.wireframe = this.getEdges(mesh);
          mesh.add(mesh.wireframe);

          // @ts-ignore
          if (!mesh.isSelected) {
            // @ts-ignore
            mesh.material = mesh.material.transparent ? this.invisibleMaterial : this.whiteMaterial;
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
          if (mesh.wireframe) {
            mesh.wireframe.visible = false;
          }
          // @ts-ignore
          if (!mesh.isSelected) {
            mesh.material = mesh.ifcMaterial;
          }
        }
      });
    });
  };

  getEdges = (item: Mesh) => {
    const geometry = new EdgesGeometry(item.geometry);
    return new LineSegments(geometry, this.lineMaterial);
  };
}
