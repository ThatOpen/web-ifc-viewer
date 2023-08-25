import {
  BufferAttribute,
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
import { IfcManager } from '../../ifc';
import GrahamScan from './graham-scan';

type DimensionUnits = "m" | "mm";

export class IfcDimensions extends IfcComponent {
  private readonly context: IfcContext;
  private readonly manager: IfcManager;
  private dimensions: IfcDimensionLine[] = [];
  private currentDimension?: IfcDimensionLine;
  private currentDimensionIn2D?: IfcDimensionLine;
  readonly labelClassName = 'ifcjs-dimension-label';
  readonly previewClassName = 'ifcjs-dimension-preview';

  // State
  private enabled = false;
  private preview = false;
  private dragging = false;
  snapDistance = 0.25;

  // Measures

  private baseScale = new Vector3(1, 1, 1);
  private dimensionIn2D = false;

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

  constructor(context: IfcContext, manager: IfcManager) {
    super(context);
    this.context = context;
    this.manager = manager
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
    (this.currentDimensionIn2D as any) = null;
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

  // TODO: This causes a memory leak, and it's a bit confusing
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
    if (!this.currentDimension || !this.currentDimensionIn2D) return;
    this.dragging = false;
    this.currentDimension?.removeFromScene();
    this.currentDimension = undefined;

    this.currentDimensionIn2D?.removeFromScene();
    this.currentDimensionIn2D = undefined;
  }

  setDimensionUnit(units: DimensionUnits) {
    if (!units) return;
    if (units === "mm") {
      IfcDimensionLine.units = units;
      IfcDimensionLine.scale = 1000;
    } else if (units === "m") {
      IfcDimensionLine.units = units;
      IfcDimensionLine.scale = 1;
    }
  }

  set setDimensionIn2D(state: boolean) {
    this.dimensionIn2D = state;
  }

  private async drawStart() {
    this.manager.selector.unpickIfcItems()

    this.dragging = true;
    const intersects = this.context.castRayIfc();
    if (!intersects) return;
    const found = this.getClosestVertex(intersects);
    if (!found) return;
    const allVertices = await this.getModelGeometry(intersects) as number[][]
    const surfaceVertices = this.grahamScan(allVertices)
    const edgePoint = this.findEdges(intersects, surfaceVertices)
    this.startPoint = edgePoint;
  }

  private grahamScan = (geometry: number[][]) => {
    const grahamScan = new GrahamScan();
    grahamScan.setPoints(geometry);
    const hull = grahamScan.getHull();

    hull.forEach((el) => {
      const htmlText = document.createElement('div');
      htmlText.textContent = "1"
      const label = new CSS2DObject(htmlText);
      label.position.set(el[0], 0.30000001192091474, el[1]);
      const scene = this.context.getScene()
      scene.add(label);
    })

    return hull
  }

  private findEdges = (intersects: Intersection, geometry: number[][]): Vector3 => {
    const vertices = geometry.map((point) => ({ x: point[0], z: point[1] }))

    function distance(p: any) {
      return Math.sqrt(Math.pow(intersects.point.x - p.x, 2) + Math.pow(intersects.point.z - p.z, 2))
    }

    let closest = vertices.reduce((a, b) => distance(a) < distance(b) ? a : b);

    return new Vector3(closest.x, intersects.point.y, closest.z)
  }

  private async getModelGeometry(intersects: Intersection) {
    if (!intersects) return

    const item = await this.manager.selector.pickIfcItem(false, true)
    if (!item) return

    const geometry = await this.getGeometryFromSubset(item.id, item.modelID)
    if (!geometry) return

    const geometryNormal = geometry.getAttribute("normal")
    const geometryPosition = geometry.getAttribute("position")

    if (!intersects.face?.normal) return

    const faceNormal = new Vector3(
      parseFloat(intersects.face.normal.x.toFixed(3)),
      parseFloat(intersects.face.normal.y.toFixed(3)),
      parseFloat(intersects.face.normal.z.toFixed(3)),
    )

    const vertices: Vector3[] = []
    const res: number[][] = []

    for (let i = 0; i < geometryPosition.count; i++) {
      const vertex = new Vector3(
        parseFloat(geometryPosition.getX(i).toFixed(3)),
        parseFloat(geometryPosition.getY(i).toFixed(3)),
        parseFloat(geometryPosition.getZ(i).toFixed(3))
      )

      const normal = new Vector3(
        parseFloat(geometryNormal.getX(i).toFixed(3)),
        parseFloat(geometryNormal.getY(i).toFixed(3)),
        parseFloat(geometryNormal.getZ(i).toFixed(3))
      )

      if (normal.equals(faceNormal)) {
        vertices.push(vertex)
        res.push([vertex.x, vertex.z])
      }
    }

    return res
  }

  private async getGeometryFromSubset(expressID: number, modelID: number) {
    const customID = 'temp-subset';

    const subset = this.manager.loader.ifcManager.createSubset({
      ids: [expressID],
      modelID,
      removePrevious: true,
      customID,
    });

    const position = subset.geometry.attributes.position;
    const coordinates = [];

    if (!subset.geometry.index) return;

    for (let i = 0; i < subset.geometry.index.count; i++) {
      const index = subset.geometry.index.array[i];

      coordinates.push(position.array[3 * index]);
      coordinates.push(position.array[3 * index + 1]);
      coordinates.push(position.array[3 * index + 2]);
    }

    const geometry = new BufferGeometry();

    geometry.setAttribute('position', new BufferAttribute(Float32Array.from(coordinates), 3));
    geometry.computeVertexNormals();

    this.manager.loader.ifcManager.removeSubset(modelID, undefined, customID);

    return geometry;
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

    if (this.dimensionIn2D) {
      if (!this.currentDimensionIn2D) this.currentDimensionIn2D = this.draw2DDimension();
      this.currentDimensionIn2D.endPoint = this.endPoint.setY(this.startPoint.y);
      //@ts-ignore
      // this.currentDimensionIn2D.endPoint = this.endPoint.setZ(this.currentDimension.axis.boundingSphere?.center.z || 0);
      this.currentDimensionIn2D.createBoundingBox();

      this.dimensions.push(this.currentDimensionIn2D);
      this.currentDimensionIn2D = undefined;
      this.currentDimension?.removeFromScene();
    }

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

  private draw2DDimension() {
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

  private static getDefaultEndpointGeometry(height = 0.1, radius = 0.03) {
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

    return intersects.point;
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
