import { BufferGeometry, Intersection, Mesh, Vector3 } from 'three';
import { Context } from '../../../base-types';
import { IfcDimensionLine } from './dimension-line';

export class IfcDimensions {
  private readonly context: Context;
  private dimensions: IfcDimensionLine[] = [];
  private enabled = true;
  private dragging = false;
  private startPoint = new Vector3();
  private endPoint = new Vector3();

  constructor(context: Context) {
    this.context = context;
  }

  get active() {
    return this.enabled;
  }

  set active(state) {
    console.log(`Clipping Active: ${state}`);
    this.enabled = state;
    // this.planes.forEach((plane) => plane.setVisibility(state));
    // this.updateMaterials();
  }

  createDimension = () => {
    if (!this.enabled) return;
    if (!this.dragging) {
      this.drawStart();
      return;
    }
    this.drawEnd();
  };

  private drawStart() {
    this.dragging = true;
    const intersects = this.context.castRayIfc();
    if (!intersects) return;
    this.startPoint = this.getClosestVertex(intersects);
  }

  private drawEnd() {
    const intersects = this.context.castRayIfc();
    if (!intersects) return;
    this.endPoint = this.getClosestVertex(intersects);
    this.drawDimension();
    this.dragging = false;
  }

  private drawDimension() {
    this.dimensions.push(new IfcDimensionLine(this.context, this.startPoint, this.endPoint));
  }

  private getClosestVertex(intersects: Intersection) {
    let closestVertex = new Vector3();
    let closestDistance = Number.MAX_SAFE_INTEGER;
    const vertices = this.getVertices(intersects);
    vertices?.forEach((vertex) => {
      if (vertex && intersects.point.distanceTo(vertex) < closestDistance) {
        closestVertex = vertex;
        closestDistance = intersects.point.distanceTo(vertex);
      }
    });
    return closestVertex;
  }

  private getVertices(intersects: Intersection) {
    const mesh = intersects.object as Mesh;
    if (!intersects.face || !mesh) return null;
    const geom = mesh.geometry;
    return [
      this.getVertex(intersects.face.a, geom),
      this.getVertex(intersects.face.b, geom),
      this.getVertex(intersects.face.c, geom)
    ];
  }

  private getVertex(index: number, geom: BufferGeometry) {
    if (index === undefined) return null;
    const vertices = geom.attributes.position;
    return new Vector3(vertices.getX(index), vertices.getY(index), vertices.getZ(index));
  }
}
