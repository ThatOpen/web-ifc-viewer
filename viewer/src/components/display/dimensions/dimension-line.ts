import {
  BoxGeometry,
  BufferGeometry,
  Color,
  ConeGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Vector3
} from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { Context, IfcComponent } from '../../../base-types';

export class IfcDimensionLine extends IfcComponent {
  private readonly context: Context;
  // private camera: Camera;

  // Elements
  private root = new Group();
  private className: string;
  private readonly line: Line;
  private readonly axis: BufferGeometry;
  private readonly coneGeometry: ConeGeometry;
  private readonly textLabel: CSS2DObject;

  // Dimensions
  private readonly length: number;
  private readonly center: Vector3;
  private readonly arrowHeight: number;
  private readonly arrowRadius: number;

  // Materials
  private lineMaterial = new LineBasicMaterial({ color: 0x000000, linewidth: 2, depthTest: false });
  private coneMaterial = new MeshBasicMaterial({ color: 0x000000, depthTest: false });

  // Bounding box
  private readonly boundingMesh: Mesh;
  private readonly boundingSize = 0.5;

  constructor(
    context: Context,
    start: Vector3,
    end: Vector3,
    className: string,
    height = 0.2,
    radius = 0.05
  ) {
    super(context);
    this.context = context;
    this.className = className;

    this.length = parseFloat(start.distanceTo(end).toFixed(2));
    this.center = this.getCenter(start, end);
    this.arrowHeight = height;
    this.arrowRadius = radius;

    this.axis = new BufferGeometry().setFromPoints([start, end]);
    this.line = new Line(this.axis, this.lineMaterial);
    this.root.add(this.line);
    this.coneGeometry = this.newConeGeometry();
    this.addArrows(start, end);
    this.textLabel = this.newText();

    this.boundingMesh = this.newBoundingBox();
    this.setupBoundingBox(end);

    this.context.getScene().add(this.root);
  }

  get boundingBox() {
    return this.boundingMesh;
  }

  get text() {
    return this.textLabel;
  }

  set dimensionColor(dimensionColor: Color) {
    this.coneMaterial.color = dimensionColor;
    this.lineMaterial.color = dimensionColor;
  }

  set visibility(visible: boolean) {
    this.root.visible = visible;
  }

  removeFromScene() {
    this.context.getScene().remove(this.root);
  }

  private addArrows(start: Vector3, end: Vector3) {
    // Don't add arrows if dimension is too small
    if (this.length > this.arrowHeight * 3) {
      this.newArrow(start, end);
      this.newArrow(end, start);
    }
  }

  private newConeGeometry() {
    const coneGeometry = new ConeGeometry(this.arrowRadius, this.arrowHeight);
    coneGeometry.translate(0, -this.arrowHeight / 2, 0);
    coneGeometry.rotateX(-Math.PI / 2);
    return coneGeometry;
  }

  private newArrow(position: Vector3, direction: Vector3) {
    const cone = new Mesh(this.coneGeometry, this.coneMaterial);
    cone.position.set(position.x, position.y, position.z);
    cone.lookAt(direction);
    this.root.add(cone);
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

  private getCenter(pointA: Vector3, pointB: Vector3) {
    let dir = pointB.clone().sub(pointA);
    const len = dir.length() * 0.5;
    dir = dir.normalize().multiplyScalar(len);
    return pointA.clone().add(dir);
  }
}
