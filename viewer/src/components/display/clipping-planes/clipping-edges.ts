import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import {
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  Line3,
  LineSegments,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Plane,
  Vector3
} from 'three';
import {
  IFCDOOR,
  IFCFURNISHINGELEMENT,
  IFCMEMBER,
  IFCPLATE,
  IFCSLAB,
  IFCWALL,
  IFCWALLSTANDARDCASE,
  IFCWINDOW
} from 'web-ifc';
import { MeshBVH } from 'three-mesh-bvh';
import { IfcMesh } from 'web-ifc-three/IFC/BaseDefinitions';
import { Context } from '../../../base-types';
import { IfcManager } from '../../ifc';

export interface Style {
  categories: number[];
  generatorGeometry: BufferGeometry;
  model: IfcMesh;
  modelID: number;
  thickLineGeometry: LineSegmentsGeometry;
  thickEdges: LineSegments2;
  subset: Mesh;
}

export interface StyleList {
  [styleName: string]: Style;
}

export interface EdgesItems {
  [styleName: string]: {
    thickLineGeometry: LineSegmentsGeometry;
    thickEdges: LineSegments2;
  };
}

export class ClippingEdges {
  static readonly styles: StyleList = {};

  private static invisibleMaterial = new MeshBasicMaterial({ visible: false });
  private static defaultMaterial = new LineMaterial({ color: 0x000000, linewidth: 0.001 });

  private readonly basicEdges: LineSegments;
  edges: EdgesItems = {};

  private inverseMatrix = new Matrix4();
  private localPlane = new Plane();
  private tempLine = new Line3();
  private tempVector = new Vector3();

  constructor(private context: Context, private clippingPlane: Plane, public ifc: IfcManager) {
    this.basicEdges = new LineSegments();
    this.newGeneratorGeometry();
  }

  remove() {
    // this.generatorGeometry.dispose();
    // this.thickEdges.removeFromParent();
    // this.thickLineGeometry.dispose();
  }

  async updateEdges() {
    const model = this.context.items.ifcModels[0];
    if (Object.keys(ClippingEdges.styles).length === 0) {
      await this.newStyle(
        model.modelID,
        'thick',
        [IFCWALLSTANDARDCASE, IFCWALL, IFCSLAB],
        new LineMaterial({ color: 0x000000, linewidth: 0.0015 })
      );

      await this.newStyle(
        model.modelID,
        'thin',
        [IFCWINDOW, IFCPLATE, IFCMEMBER, IFCDOOR, IFCFURNISHINGELEMENT],
        new LineMaterial({ color: 0x333333, linewidth: 0.001 })
      );
    }
    Object.keys(ClippingEdges.styles).forEach((style) => {
      this.drawEdges(ClippingEdges.styles[style], model);
    });
  }

  async newStyle(
    modelID: number,
    styleName: string,
    categories: number[],
    material = ClippingEdges.defaultMaterial
  ) {
    const generatorGeometry = this.newGeneratorGeometry();
    const thickLineGeometry = new LineSegmentsGeometry();
    material.clippingPlanes = this.context.getClippingPlanes();
    ClippingEdges.styles[styleName] = {
      modelID,
      categories,
      generatorGeometry,
      thickLineGeometry,
      model: this.context.items.ifcModels[modelID],
      thickEdges: this.newThickEdges(thickLineGeometry, material),
      subset: await this.newSubset(styleName, modelID, categories)
    };
  }

  private async newSubset(styleName: string, modelID: number, categories: number[]) {
    const subset = this.ifc.loader.ifcManager.createSubset({
      modelID,
      customID: `${styleName}`,
      material: ClippingEdges.invisibleMaterial,
      removePrevious: true,
      scene: this.context.getScene(),
      ids: await this.getItemIDs(modelID, categories)
    });
    if (subset) {
      subset.geometry.boundsTree = new MeshBVH(subset.geometry, { maxLeafTris: 3 });
      return subset;
    }
    throw new Error(`Subset could not be created for the following style: ${styleName}`);
  }

  private async getItemIDs(modelID: number, categories: number[]) {
    const ids: number[] = [];
    for (let j = 0; j < categories.length; j++) {
      // eslint-disable-next-line no-await-in-loop
      const found = await this.ifc.getAllItemsOfType(modelID, categories[j], false);
      ids.push(...found);
    }
    return ids;
  }

  private newThickEdges(thickLineGeometry: LineSegmentsGeometry, material: LineMaterial) {
    const thickEdges = new LineSegments2(thickLineGeometry, material);
    thickEdges.material.polygonOffset = true;
    thickEdges.material.polygonOffsetFactor = -2;
    thickEdges.material.polygonOffsetUnits = 1;
    thickEdges.renderOrder = 3;
    return thickEdges;
  }

  private newGeneratorGeometry() {
    // create line geometry with enough data to hold 100000 segments
    const generatorGeometry = new BufferGeometry();
    const linePosAttr = new BufferAttribute(new Float32Array(300000), 3, false);
    linePosAttr.setUsage(DynamicDrawUsage);
    generatorGeometry.setAttribute('position', linePosAttr);
    return generatorGeometry;
  }

  // Source: https://gkjohnson.github.io/three-mesh-bvh/example/bundle/clippedEdges.html
  private drawEdges(style: Style, model: Mesh) {
    if (!style.subset.geometry.boundsTree) return;

    this.inverseMatrix.copy(style.subset.matrixWorld).invert();
    this.localPlane.copy(this.clippingPlane).applyMatrix4(this.inverseMatrix);

    let index = 0;
    const posAttr = style.generatorGeometry.attributes.position;
    // @ts-ignore
    posAttr.array.fill(0);

    style.subset.geometry.boundsTree.shapecast({
      intersectsBounds: (box: any) => {
        return this.localPlane.intersectsBox(box) as any;
      },

      // @ts-ignore
      intersectsTriangle: (tri: any) => {
        // check each triangle edge to see if it intersects with the plane. If so then
        // add it to the list of segments.
        let count = 0;
        this.tempLine.start.copy(tri.a);
        this.tempLine.end.copy(tri.b);
        if (this.localPlane.intersectLine(this.tempLine, this.tempVector)) {
          posAttr.setXYZ(index, this.tempVector.x, this.tempVector.y, this.tempVector.z);
          count++;
          index++;
        }

        this.tempLine.start.copy(tri.b);
        this.tempLine.end.copy(tri.c);
        if (this.localPlane.intersectLine(this.tempLine, this.tempVector)) {
          posAttr.setXYZ(index, this.tempVector.x, this.tempVector.y, this.tempVector.z);
          count++;
          index++;
        }

        this.tempLine.start.copy(tri.c);
        this.tempLine.end.copy(tri.a);
        if (this.localPlane.intersectLine(this.tempLine, this.tempVector)) {
          posAttr.setXYZ(index, this.tempVector.x, this.tempVector.y, this.tempVector.z);
          count++;
          index++;
        }

        // If we only intersected with one or three sides then just remove it. This could be handled
        // more gracefully.
        if (count !== 2) {
          index -= count;
        }
      }
    });

    // set the draw range to only the new segments and offset the lines so they don't intersect with the geometry
    style.thickEdges.geometry.setDrawRange(0, index);
    style.thickEdges.position.copy(this.clippingPlane.normal).multiplyScalar(0.0001);
    posAttr.needsUpdate = true;

    this.basicEdges.geometry = style.generatorGeometry;
    style.thickEdges.geometry = style.thickLineGeometry.fromLineSegments(this.basicEdges);
    if (style.thickEdges.parent !== model) {
      model.add(style.thickEdges);
    }
  }
}
