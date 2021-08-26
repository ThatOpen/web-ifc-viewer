import {
  BufferGeometry,
  Color,
  ConeGeometry,
  Intersection,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3
} from 'three';
import { Context, IfcComponent } from '../../../base-types';
import { IfcDimensionLine } from './dimension-line';

export class IfcDimensions extends IfcComponent {
  private readonly context: Context;
  private dimensions: IfcDimensionLine[] = [];
  readonly className = 'ifcjs-dimension-label';

  // State
  private enabled = false;
  private preview = false;
  private dragging = false;

  // Measures
  private arrowHeight = 0.2;
  private arrowRadius = 0.05;
  private baseScale = new Vector3(1, 1, 1);

  // Geometries
  private endpoint: BufferGeometry;
  private previewGeometry = new SphereGeometry(0.1);

  // Materials
  private lineMaterial = new LineBasicMaterial({ color: 0x000000, linewidth: 2, depthTest: false });
  private endpointsMaterial = new MeshBasicMaterial({ color: 0x000000, depthTest: false });
  private previewMaterial = new MeshBasicMaterial({
    color: 0xff00ff,
    transparent: true,
    opacity: 0.3,
    depthTest: false
  });

  // Meshes
  private previewMesh = new Mesh(this.previewGeometry, this.previewMaterial);

  // Temp variables
  private startPoint = new Vector3();
  private endPoint = new Vector3();

  constructor(context: Context) {
    super(context);
    this.context = context;
    this.endpoint = this.getDefaultEndpointGeometry();
  }

  update(_delta: number) {
    if (this.enabled && this.preview) {
      const intersects = this.context.castRayIfc();
      this.previewMesh.visible = !!intersects;
      if (!intersects) return;
      this.previewMesh.visible = true;
      const closest = this.getClosestVertex(intersects);
      this.previewMesh.position.set(closest.x, closest.y, closest.z);
    }
  }

  get active() {
    return this.enabled;
  }

  get previewActive() {
    return this.preview;
  }

  get previewObject() {
    return this.previewMesh;
  }

  set previewActive(state: boolean) {
    this.preview = state;
    const scene = this.context.getScene();
    if (this.preview) {
      scene.add(this.previewMesh);
    } else {
      scene.remove(this.previewMesh);
    }
  }

  set active(state: boolean) {
    console.log(`Clipping Active: ${state}`);
    this.enabled = state;
    this.dimensions.forEach((dim) => {
      dim.visibility = state;
    });
  }

  set dimensionsColor(color: Color) {
    this.endpointsMaterial.color = color;
    this.lineMaterial.color = color;
  }

  set endpointGeometry(geometry: BufferGeometry) {
    this.dimensions.forEach((dim) => {
      dim.endpointGeometry = geometry;
    });
  }

  set endpointScale(scale: Vector3) {
    this.baseScale = scale;
    this.dimensions.forEach((dim) => {
      dim.endpointScale = scale;
    });
  }

  create = () => {
    if (!this.enabled) return;
    if (!this.dragging) {
      this.drawStart();
      return;
    }
    this.drawEnd();
  };

  delete = () => {
    if (!this.enabled || this.dimensions.length === 0) return;
    const boundingBoxes = this.dimensions.map((dim) => dim.boundingBox);
    const intersects = this.context.castRay(boundingBoxes);
    if (!intersects) return;
    const selected = this.dimensions.find((dim) => dim.boundingBox === intersects[0].object);
    if (!selected) return;
    const index = this.dimensions.indexOf(selected);
    this.dimensions.splice(index, 1);
    selected.removeFromScene();
  };

  deleteAll = () => {
    this.dimensions.forEach((dim) => {
      dim.removeFromScene();
    });
    this.dimensions = [];
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
    this.dimensions.push(
      new IfcDimensionLine(
        this.context,
        this.startPoint,
        this.endPoint,
        this.lineMaterial,
        this.endpointsMaterial,
        this.endpoint,
        this.className,
        this.baseScale
      )
    );
  }

  private getDefaultEndpointGeometry() {
    const coneGeometry = new ConeGeometry(this.arrowRadius, this.arrowHeight);
    coneGeometry.translate(0, -this.arrowHeight / 2, 0);
    coneGeometry.rotateX(-Math.PI / 2);
    return coneGeometry;
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
