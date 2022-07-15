import {
  BufferGeometry,
  Color,
  ConeGeometry,
  Intersection,
  LineDashedMaterial,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Vector3
} from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { IfcComponent } from '../../../base-types';
import { IfcDimensionLine } from './dimension-line';
import { IfcContext } from '../../context';

export class IfcDimensions extends IfcComponent {
  private readonly context: IfcContext;
  private dimensions: IfcDimensionLine[] = [];
  private currentDimension?: IfcDimensionLine;
  readonly labelClassName = 'ifcjs-dimension-label';
  readonly previewClassName = 'ifcjs-dimension-preview';

  // State
  private enabled = false;
  private preview = false;
  private dragging = false;
  snapDistance = 0.25;

  // Measures

  private baseScale = new Vector3(1, 1, 1);

  // Geometries
  private endpoint: BufferGeometry;
  private previewElement: CSS2DObject;

  // Materials
  private lineMaterial = new LineDashedMaterial({
    color: 0x000000,
    linewidth: 2,
    depthTest: false,
    dashSize: 0.2,
    gapSize: 0.2
  });

  private endpointsMaterial = new MeshBasicMaterial({ color: 0x000000, depthTest: false });

  // Temp variables
  private startPoint = new Vector3();
  private endPoint = new Vector3();

  constructor(context: IfcContext) {
    super(context);
    this.context = context;
    this.endpoint = IfcDimensions.getDefaultEndpointGeometry();
    const htmlPreview = document.createElement('div');
    htmlPreview.className = this.previewClassName;
    this.previewElement = new CSS2DObject(htmlPreview);
    this.previewElement.visible = false;
  }

  dispose() {
    (this.context as any) = null;
    this.dimensions.forEach((dim) => dim.dispose());
    (this.dimensions as any) = null;
    (this.currentDimension as any) = null;
    this.endpoint.dispose();
    (this.endpoint as any) = null;

    this.previewElement.removeFromParent();
    this.previewElement.element.remove();
    (this.previewElement as any) = null;
  }

  update(_delta: number) {
    if (this.enabled && this.preview) {
      const intersects = this.context.castRayIfc();
      this.previewElement.visible = !!intersects;
      if (!intersects) return;
      this.previewElement.visible = true;
      const closest = this.getClosestVertex(intersects);
      this.previewElement.visible = !!closest;
      if (!closest) return;
      this.previewElement.position.set(closest.x, closest.y, closest.z);
      if (this.dragging) {
        this.drawInProcess();
      }
    }
  }

  setArrow(height: number, radius: number) {
    this.endpoint = IfcDimensions.getDefaultEndpointGeometry(height, radius);
  }

  setPreviewElement(element: HTMLElement) {
    this.previewElement = new CSS2DObject(element);
  }

  get active() {
    return this.enabled;
  }

  get previewActive() {
    return this.preview;
  }

  get previewObject() {
    return this.previewElement;
  }

  set previewActive(state: boolean) {
    this.preview = state;
    const scene = this.context.getScene();
    if (this.preview) {
      scene.add(this.previewElement);
    } else {
      scene.remove(this.previewElement);
    }
  }

  set active(state: boolean) {
    this.enabled = state;
    this.dimensions.forEach((dim) => {
      dim.visibility = state;
    });
  }

  set dimensionsColor(color: Color) {
    this.endpointsMaterial.color = color;
    this.lineMaterial.color = color;
  }

  set dimensionsWidth(width: number) {
    this.lineMaterial.linewidth = width;
  }

  set endpointGeometry(geometry: BufferGeometry) {
    this.dimensions.forEach((dim) => {
      dim.endpointGeometry = geometry;
    });
  }

  set endpointScaleFactor(factor: number) {
    IfcDimensionLine.scaleFactor = factor;
  }

  set endpointScale(scale: Vector3) {
    this.baseScale = scale;
    this.dimensions.forEach((dim) => {
      dim.endpointScale = scale;
    });
  }

  create() {
    if (!this.enabled) return;
    if (!this.dragging) {
      this.drawStart();
      return;
    }
    this.drawEnd();
  }

  createInPlane(plane: Object3D) {
    if (!this.enabled) return;
    if (!this.dragging) {
      this.drawStartInPlane(plane);
      return;
    }
    this.drawEnd();
  }

  delete() {
    if (!this.enabled || this.dimensions.length === 0) return;
    const boundingBoxes = this.getBoundingBoxes();
    const intersects = this.context.castRay(boundingBoxes);
    if (intersects.length === 0) return;
    const selected = this.dimensions.find((dim) => dim.boundingBox === intersects[0].object);
    if (!selected) return;
    const index = this.dimensions.indexOf(selected);
    this.dimensions.splice(index, 1);
    selected.removeFromScene();
  }

  deleteAll() {
    this.dimensions.forEach((dim) => {
      dim.removeFromScene();
    });
    this.dimensions = [];
  }

  cancelDrawing() {
    if (!this.currentDimension) return;
    this.dragging = false;
    this.currentDimension?.removeFromScene();
    this.currentDimension = undefined;
  }

  private drawStart() {
    this.dragging = true;
    const intersects = this.context.castRayIfc();
    if (!intersects) return;
    const found = this.getClosestVertex(intersects);
    if (!found) return;
    this.startPoint = found;
  }

  private drawStartInPlane(plane: Object3D) {
    this.dragging = true;

    const intersects = this.context.castRay([plane]);
    if (!intersects || intersects.length < 1) return;
    this.startPoint = intersects[0].point;
  }

  private drawInProcess() {
    const intersects = this.context.castRayIfc();
    if (!intersects) return;
    const found = this.getClosestVertex(intersects);
    if (!found) return;
    this.endPoint = found;
    if (!this.currentDimension) this.currentDimension = this.drawDimension();
    this.currentDimension.endPoint = this.endPoint;
  }

  private drawEnd() {
    if (!this.currentDimension) return;
    this.currentDimension.createBoundingBox();
    this.dimensions.push(this.currentDimension);
    this.currentDimension = undefined;
    this.dragging = false;
  }

  get getDimensionsLines() {
    return this.dimensions;
  }

  private drawDimension() {
    return new IfcDimensionLine(
      this.context,
      this.startPoint,
      this.endPoint,
      this.lineMaterial,
      this.endpointsMaterial,
      this.endpoint,
      this.labelClassName,
      this.baseScale
    );
  }

  private getBoundingBoxes() {
    return this.dimensions
      .map((dim) => dim.boundingBox)
      .filter((box) => box !== undefined) as Mesh[];
  }

  private static getDefaultEndpointGeometry(height = 0.02, radius = 0.05) {
    const coneGeometry = new ConeGeometry(radius, height);
    coneGeometry.translate(0, -height / 2, 0);
    coneGeometry.rotateX(-Math.PI / 2);
    return coneGeometry;
  }

  private getClosestVertex(intersects: Intersection) {
    let closestVertex = new Vector3();
    let vertexFound = false;
    let closestDistance = Number.MAX_SAFE_INTEGER;
    const vertices = this.getVertices(intersects);
    vertices?.forEach((vertex) => {
      if (!vertex) return;
      const distance = intersects.point.distanceTo(vertex);
      if (distance > closestDistance || distance > this.snapDistance) return;
      vertexFound = true;
      closestVertex = vertex;
      closestDistance = intersects.point.distanceTo(vertex);
    });
    return vertexFound ? closestVertex : intersects.point;
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
