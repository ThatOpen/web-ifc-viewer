import {
  BoxGeometry,
  BufferGeometry,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  Camera
} from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { IfcContext } from '../../context';
import { disposeMeshRecursively } from '../../../utils/ThreeUtils';

export class IfcDimensionLine {
  private readonly context: IfcContext;
  private readonly camera: Camera;
  private readonly labelClassName: string;
  static scaleFactor = 0.1;

  static scale = 1;
  static units = 'm';

  // Elements
  private root = new Group();
  private readonly line: Line;
  private readonly textLabel: CSS2DObject;
  private endpointMeshes: Mesh[] = [];

  // Geometries
  private readonly axis: BufferGeometry;
  private endpoint: BufferGeometry;

  // Dimensions
  start: Vector3;
  end: Vector3;
  center: Vector3;
  private length: number;
  private scale = new Vector3(1, 1, 1);

  // Materials
  private readonly lineMaterial: LineBasicMaterial;
  private readonly endpointMaterial: MeshBasicMaterial;

  // Bounding box
  private boundingMesh?: Mesh;
  private readonly boundingSize = 0.05;

  constructor(
    context: IfcContext,
    start: Vector3,
    end: Vector3,
    lineMaterial: LineBasicMaterial,
    endpointMaterial: MeshBasicMaterial,
    endpointGeometry: BufferGeometry,
    className: string,
    endpointScale: Vector3
  ) {
    this.context = context;
    this.labelClassName = className;

    this.start = start;
    this.end = end;
    this.scale = endpointScale;

    this.lineMaterial = lineMaterial;
    this.endpointMaterial = endpointMaterial;

    this.length = this.getLength();
    this.center = this.getCenter();

    this.axis = new BufferGeometry().setFromPoints([start, end]);
    this.line = new Line(this.axis, this.lineMaterial);
    this.root.add(this.line);
    this.endpoint = endpointGeometry;
    this.addEndpointMeshes();
    this.textLabel = this.newText();

    this.root.renderOrder = 2;
    this.context.getScene().add(this.root);

    this.camera = this.context.getCamera();
    this.context.ifcCamera.onChange.on(() => this.rescaleObjectsToCameraPosition());
    this.rescaleObjectsToCameraPosition();
  }

  dispose() {
    this.removeFromScene();
    (this.context as any) = null;
    disposeMeshRecursively(this.root as any);
    (this.root as any) = null;
    disposeMeshRecursively(this.line as any);
    (this.line as any) = null;
    this.endpointMeshes.forEach((mesh) => disposeMeshRecursively(mesh));
    this.endpointMeshes.length = 0;
    this.axis.dispose();
    (this.axis as any) = null;
    this.endpoint.dispose();
    (this.endpoint as any) = null;

    this.textLabel.removeFromParent();
    this.textLabel.element.remove();
    (this.textLabel as any) = null;

    this.lineMaterial.dispose();
    (this.lineMaterial as any) = null;
    this.endpointMaterial.dispose();
    (this.endpointMaterial as any) = null;

    if (this.boundingMesh) {
      disposeMeshRecursively(this.boundingMesh);
      (this.boundingMesh as any) = null;
    }
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

  set endPoint(point: Vector3) {
    this.end = point;
    if (!this.axis) return;
    const position = this.axis.attributes.position;
    if (!position) return;
    position.setXYZ(1, point.x, point.y, point.z);
    position.needsUpdate = true;
    this.endpointMeshes[1].position.set(point.x, point.y, point.z);
    this.endpointMeshes[1].lookAt(this.start);
    this.endpointMeshes[0].lookAt(this.end);
    this.length = this.getLength();
    this.textLabel.element.textContent = this.getTextContent();
    this.center = this.getCenter();
    this.textLabel.position.set(this.center.x, this.center.y, this.center.z);
    this.line.computeLineDistances();
  }

  removeFromScene() {
    this.context.getScene().remove(this.root);
    this.root.remove(this.textLabel);
  }

  createBoundingBox() {
    this.boundingMesh = this.newBoundingBox();
    this.setupBoundingBox(this.end);
  }

  private rescaleObjectsToCameraPosition() {
    this.endpointMeshes.forEach((mesh) => this.rescaleMesh(mesh, IfcDimensionLine.scaleFactor));
    if (this.boundingMesh) {
      this.rescaleMesh(this.boundingMesh, this.boundingSize, true, true, false);
    }
  }

  private rescaleMesh(mesh: Mesh, scalefactor = 1, x = true, y = true, z = true) {
    let scale = new Vector3().subVectors(mesh.position, this.camera.position).length();
    scale *= scalefactor;
    const scaleX = x ? scale : 1;
    const scaleY = y ? scale : 1;
    const scaleZ = z ? scale : 1;
    mesh.scale.set(scaleX, scaleY, scaleZ);
  }

  private addEndpointMeshes() {
    this.newEndpointMesh(this.start, this.end);
    this.newEndpointMesh(this.end, this.start);
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
    htmlText.className = this.labelClassName;
    htmlText.textContent = this.getTextContent();
    const label = new CSS2DObject(htmlText);
    label.position.set(this.center.x, this.center.y, this.center.z);
    this.root.add(label);
    return label;
  }

  private getTextContent() {
    return `${this.length / IfcDimensionLine.scale} ${IfcDimensionLine.units}`;
  }

  private newBoundingBox() {
    const box = new BoxGeometry(1, 1, this.length);
    return new Mesh(box);
  }

  private setupBoundingBox(end: Vector3) {
    if (!this.boundingMesh) return;
    this.boundingMesh.position.set(this.center.x, this.center.y, this.center.z);
    this.boundingMesh.lookAt(end);
    this.boundingMesh.visible = false;
    this.root.add(this.boundingMesh);
  }

  private getLength() {
    return parseFloat(this.start.distanceTo(this.end).toFixed(2));
  }

  private getCenter() {
    let dir = this.end.clone().sub(this.start);
    const len = dir.length() * 0.5;
    dir = dir.normalize().multiplyScalar(len);
    return this.start.clone().add(dir);
  }
}
