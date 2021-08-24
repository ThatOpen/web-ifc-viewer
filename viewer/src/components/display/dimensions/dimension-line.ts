import {
  BoxGeometry,
  BufferGeometry,
  Camera,
  Color,
  ConeGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Vector3
} from 'three';
import { Context, IfcComponent } from '../../../base-types';

export class IfcDimensionLine extends IfcComponent {
  private readonly context: Context;
  private camera: Camera;

  // Elements
  private root = new Group();
  private readonly line: Line;
  private readonly axis: BufferGeometry;
  private readonly coneGeometry: ConeGeometry;
  private readonly text: HTMLParagraphElement;

  // Dimensions
  private readonly length: number;
  private readonly center: Vector3;
  private readonly arrowHeight: number;
  private readonly arrowRadius: number;
  private previousScreenPosition = new Vector3(0, 0, 0);

  // Materials
  private lineMaterial = new LineBasicMaterial({ color: 0x000000, linewidth: 2, depthTest: false });
  private coneMaterial = new MeshBasicMaterial({ color: 0x000000, depthTest: false });

  // Bounding box
  private readonly boundingMesh: Mesh;
  private readonly boundingSize = 0.5;

  constructor(context: Context, start: Vector3, end: Vector3, height = 0.2, radius = 0.05) {
    super(context);
    this.context = context;
    this.camera = context.getCamera();

    this.length = parseFloat(start.distanceTo(end).toFixed(2));
    this.center = this.getCenter(start, end);
    this.arrowHeight = height;
    this.arrowRadius = radius;

    this.axis = new BufferGeometry().setFromPoints([start, end]);
    this.line = new Line(this.axis, this.lineMaterial);
    this.root.add(this.line);
    this.coneGeometry = this.newConeGeometry();
    this.addArrows(start, end);
    this.text = this.newText();

    this.boundingMesh = this.newBoundingBox();
    this.setupBoundingBox(end);

    this.context.getScene().add(this.root);
  }

  get dimensionText() {
    return this.text;
  }

  get boundingBox() {
    return this.boundingMesh;
  }

  get classes() {
    return this.text.classList;
  }

  set dimensionColor(dimensionColor: Color) {
    this.coneMaterial.color = dimensionColor;
    this.lineMaterial.color = dimensionColor;
  }

  set visibility(visible: boolean) {
    this.root.visible = visible;
    this.text.style.visibility = visible ? 'visible' : 'collapse';
  }

  update(_delta: number) {
    const screenPosition = this.center.clone();
    screenPosition.project(this.camera);
    const isInsideFrustum = Math.abs(screenPosition.z) <= 1;
    this.setTextVisibility(isInsideFrustum);
    if (!isInsideFrustum) return;
    if (this.previousScreenPosition.equals(screenPosition)) return;
    this.updateTextPosition(screenPosition);
  }

  removeFromScene() {
    this.text.remove();
    this.context.getScene().remove(this.root);
  }

  private updateTextPosition(screenPosition: Vector3) {
    const domElement = this.context.getDomElement().parentElement;
    if (!domElement) return;
    const translateX = screenPosition.x * domElement.clientWidth * 0.5;
    const translateY = -screenPosition.y * domElement.clientHeight * 0.5;
    this.text.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  }

  private setTextVisibility(visible: boolean) {
    this.text.style.visibility = visible ? 'visible' : 'collapse';
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
    const text = document.createElement('p');
    this.formatText(text);
    const domElement = this.context.getDomElement();
    domElement.parentElement?.appendChild(text);
    return text;
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

  private formatText(text: HTMLParagraphElement) {
    text.style.position = 'absolute';
    text.style.display = 'block';
    text.style.pointerEvents = 'none';
    text.style.top = '50%';
    text.style.left = '50%';
    text.innerHTML = `${this.length} m`;
  }

  private getCenter(pointA: Vector3, pointB: Vector3) {
    let dir = pointB.clone().sub(pointA);
    const len = dir.length() * 0.5;
    dir = dir.normalize().multiplyScalar(len);
    return pointA.clone().add(dir);
  }
}
