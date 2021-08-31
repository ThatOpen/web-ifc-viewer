import {
  BoxGeometry,
  BufferGeometry,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  MeshBasicMaterial,
  Mesh,
  Vector3
} from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { Context, IfcComponent } from '../../../base-types';

export class IfcDimensionLine extends IfcComponent {
  private readonly context: Context;
  private className: string;

  // Elements
  private root = new Group();
  private readonly line: Line;
  private readonly textLabel: CSS2DObject;
  private endpointMeshes: Mesh[] = [];

  // Geometries
  private readonly axis: BufferGeometry;
  private endpoint: BufferGeometry;

  // Dimensions
  private start: Vector3;
  private end: Vector3;
  private readonly length: number;
  private readonly center: Vector3;
  private minimumLengthToDisplayEndpoints = 0.6;
  private scale = new Vector3(1, 1, 1);

  // Materials
  private lineMaterial: LineBasicMaterial;
  private endpointMaterial: MeshBasicMaterial;

  // Bounding box
  private readonly boundingMesh: Mesh;
  private readonly boundingSize = 0.5;

  constructor(
    context: Context,
    start: Vector3,
    end: Vector3,
    lineMaterial: LineBasicMaterial,
    endpointMaterial: MeshBasicMaterial,
    endpointGeometry: BufferGeometry,
    className: string,
    endpointScale: Vector3
  ) {
    super(context);
    this.context = context;
    this.className = className;

    this.start = start;
    this.end = end;
    this.scale = endpointScale;

    this.lineMaterial = lineMaterial;
    this.endpointMaterial = endpointMaterial;

    this.length = parseFloat(start.distanceTo(end).toFixed(2));
    this.center = this.getCenter();

    this.axis = new BufferGeometry().setFromPoints([start, end]);
    this.line = new Line(this.axis, this.lineMaterial);
    this.root.add(this.line);
    this.endpoint = endpointGeometry;
    this.addEndpointMeshes();
    this.textLabel = this.newText();

    this.boundingMesh = this.newBoundingBox();
    this.setupBoundingBox(end);

    this.root.renderOrder = 2;
    this.context.getScene().add(this.root);
  }

  get boundingBox() {
    return this.boundingMesh;
  }

  get text() {
    return this.textLabel;
  }

  set dimensionColor(dimensionColor: Color) {
    this.endpointMaterial.color = dimensionColor;
    this.lineMaterial.color = dimensionColor;
  }

  set visibility(visible: boolean) {
    this.root.visible = visible;
    this.textLabel.visible = visible;
  }

  set endpointGeometry(geometry: BufferGeometry) {
    this.endpointMeshes.forEach((mesh) => this.root.remove(mesh));
    this.endpointMeshes = [];
    this.endpoint = geometry;
    this.addEndpointMeshes();
  }

  set endpointScale(scale: Vector3) {
    this.scale = scale;
    this.endpointMeshes.forEach((mesh) => mesh.scale.set(scale.x, scale.y, scale.z));
  }

  removeFromScene() {
    this.context.getScene().remove(this.root);
    this.root.remove(this.textLabel);
  }

  private addEndpointMeshes() {
    if (this.length > this.minimumLengthToDisplayEndpoints) {
      this.newEndpointMesh(this.start, this.end);
      this.newEndpointMesh(this.end, this.start);
    }
  }

  private newEndpointMesh(position: Vector3, direction: Vector3) {
    const mesh = new Mesh(this.endpoint, this.endpointMaterial);
    mesh.position.set(position.x, position.y, position.z);
    mesh.scale.set(this.scale.x, this.scale.y, this.scale.z);
    mesh.lookAt(direction);
    this.endpointMeshes.push(mesh);
    this.root.add(mesh);
  }

  private newText() {
    const htmlText = document.createElement('div');
    htmlText.className = this.className;
    htmlText.textContent = `${this.length} m`;
    const label = new CSS2DObject(htmlText);
    label.position.set(this.center.x, this.center.y, this.center.z);
    this.root.add(label);
    return label;
  }

  private newBoundingBox() {
    const box = new BoxGeometry(this.boundingSize, this.boundingSize, this.length);
    return new Mesh(box);
  }

  private setupBoundingBox(end: Vector3) {
    this.boundingMesh.position.set(this.center.x, this.center.y, this.center.z);
    this.boundingMesh.lookAt(end);
    this.boundingMesh.visible = false;
    this.root.add(this.boundingMesh);
  }

  private getCenter() {
    let dir = this.end.clone().sub(this.start);
    const len = dir.length() * 0.5;
    dir = dir.normalize().multiplyScalar(len);
    return this.start.clone().add(dir);
  }
}
