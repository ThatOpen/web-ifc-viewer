import { BufferGeometry, ConeGeometry, Group, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { Context } from '../../../base-types';

export class IfcDimensionLine {
  line: Line;
  axis: BufferGeometry;
  root = new Group();
  lineMaterial = new LineBasicMaterial({ color: 0x000000, linewidth: 2, depthTest: false });
  coneGeometry = new ConeGeometry(this.arrowRadius, this.arrowHeight);
  coneMaterial = new MeshBasicMaterial({ color: 0x000000, depthTest: false });
  private context: Context;
  private arrowHeight: number;
  private arrowRadius: number;

  constructor(context: Context, start: Vector3, end: Vector3, height = 0.2, radius = 0.05) {
    this.context = context;
    this.arrowHeight = height;
    this.arrowRadius = radius;
    this.coneGeometry.rotateX(-Math.PI / 2);
    this.axis = new BufferGeometry().setFromPoints([start, end]);
    this.line = new Line(this.axis, this.lineMaterial);
    this.createArrow(start, end);
    this.createArrow(end, start);
    this.root.add(this.line);
    this.context.getScene().add(this.root);
  }

  private createArrow(position: Vector3, direction: Vector3) {
    const cone = new Mesh(this.coneGeometry, this.coneMaterial);
    cone.position.z -= this.arrowHeight;
    cone.position.set(position.x, position.y, position.z);
    cone.lookAt(direction);
    this.root.add(cone);
  }
}
