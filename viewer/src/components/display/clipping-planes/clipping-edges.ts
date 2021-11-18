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
  Plane,
  Vector3
} from 'three';
import { Context } from '../../../base-types';
import { IfcManager } from '../../ifc';

// export interface Style {
//   categories: number[];
//   material: LineMaterial;
//   generatorGeometry?: BufferGeometry;
//   model?: BufferGeometry;
//   thickLineGeometry?: LineSegmentsGeometry;
//   thickEdges?: LineSegments2;
// }
//
// export interface StyleList {
//   [styleName: string]: Style;
// }

// Source: https://gkjohnson.github.io/three-mesh-bvh/example/bundle/clippedEdges.html
export class ClippingEdges {
  // static readonly styles: StyleList = {
  //   thick: {
  //     categories: [IFCWALL, IFCWALLSTANDARDCASE, IFCSLAB, IFCROOF],
  //     material: new LineMaterial({
  //       color: 0x000000,
  //       linewidth: 0.001
  //     })
  //   },
  //   thin: {
  //     categories: [IFCDOOR, IFCWINDOW, IFCPLATE, IFCMEMBER],
  //     material: new LineMaterial({
  //       color: 0x000000,
  //       linewidth: 0.001
  //     })
  //   }
  // };

  private readonly basicEdges: LineSegments;
  private readonly generatorGeometry: BufferGeometry;
  private readonly thickEdges: LineSegments2;
  private readonly thickMaterial: LineMaterial;
  private readonly thickLineGeometry: LineSegmentsGeometry;

  private inverseMatrix = new Matrix4();
  private localPlane = new Plane();
  private tempLine = new Line3();
  private tempVector = new Vector3();

  constructor(private context: Context, private clippingPlane: Plane, public ifc: IfcManager) {
    const planes = this.context.getClippingPlanes();
    this.generatorGeometry = new BufferGeometry();
    this.basicEdges = new LineSegments();
    this.thickLineGeometry = new LineSegmentsGeometry();
    this.thickMaterial = new LineMaterial({
      color: 0x000000,
      linewidth: 0.001,
      clippingPlanes: planes
    });
    this.thickEdges = new LineSegments2(this.thickLineGeometry, this.thickMaterial);
    this.initializeEdgesGeometry();
    this.initializeEdgesObject();
  }

  // async regenerateStyles(stylesNames = Object.keys(ClippingEdges.styles)) {
  //   // for (let i = 0; i < stylesNames.length; i++) {
  //
  //   const styleName = stylesNames[0];
  //   const currentStyle = ClippingEdges.styles[styleName];
  //   if (currentStyle.generatorGeometry) {
  //     currentStyle.generatorGeometry.dispose();
  //   }
  //
  //   const ids: number[] = [];
  //   for (let j = 0; j < currentStyle.categories.length; j++) {
  //     const category = currentStyle.categories[j];
  //     // eslint-disable-next-line no-await-in-loop
  //     const found = await this.ifc.loader.ifcManager.getAllItemsOfType(0, category, false);
  //     ids.push(...found);
  //   }
  //
  //   if (ids.length === 0) return;
  //
  //   const subset = this.ifc.loader.ifcManager.createSubset({
  //     modelID: 0,
  //     ids,
  //     scene: new Object3D(),
  //     removePrevious: true,
  //     customId: `styles - ${styleName}`
  //   });
  //
  //   currentStyle.material.polygonOffset = true;
  //   currentStyle.material.polygonOffsetFactor = -2;
  //   currentStyle.material.polygonOffsetUnits = 1;
  //
  //   if (subset && subset.geometry) currentStyle.model = subset.geometry;
  //   if (!currentStyle.thickLineGeometry)
  //     currentStyle.thickLineGeometry = new LineSegmentsGeometry();
  //   if (!currentStyle.thickEdges) {
  //     currentStyle.thickEdges = new LineSegments2();
  //     currentStyle.thickEdges.renderOrder = 3;
  //     currentStyle.thickEdges.material = currentStyle.material;
  //   }
  //
  //   if (!currentStyle.generatorGeometry) {
  //     currentStyle.generatorGeometry = new BufferGeometry();
  //     const linePosAttr = new BufferAttribute(new Float32Array(300000), 3, false);
  //     linePosAttr.setUsage(DynamicDrawUsage);
  //     currentStyle.generatorGeometry.setAttribute('position', linePosAttr);
  //   }
  //
  //   // const model = this.context.items.ifcModels[0];
  //   this.updateEdges(subset, currentStyle);
  //   // }
  // }

  remove() {
    this.generatorGeometry.dispose();
    this.thickEdges.removeFromParent();
    this.thickLineGeometry.dispose();
  }

  updateEdges() {
    const model = this.context.items.ifcModels[0];
    if (!model.geometry || !model.geometry.boundsTree) return;

    this.inverseMatrix.copy(model.matrixWorld).invert();
    this.localPlane.copy(this.clippingPlane).applyMatrix4(this.inverseMatrix);

    let index = 0;
    const posAttr = this.generatorGeometry.attributes.position;
    // @ts-ignore
    posAttr.array.fill(0);

    model.geometry.boundsTree.shapecast({
      intersectsBounds: (box) => {
        return this.localPlane.intersectsBox(box) as any;
      },

      // @ts-ignore
      intersectsTriangle: (tri) => {
        // check each triangle edge to see if it intersects with the plane. If so then
        // add it to the list of segments.
        let count = 0;
        this.tempLine.start.copy(tri.a);
        this.tempLine.end.copy(tri.b);
        if (this.localPlane.intersectLine(this.tempLine, this.tempVector)) {
          posAttr.setXYZ(index, this.tempVector.x, this.tempVector.y, this.tempVector.z);
          index++;
          count++;
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
    this.thickEdges.geometry.setDrawRange(0, index);
    this.thickEdges.position.copy(this.clippingPlane.normal).multiplyScalar(0.0001);
    posAttr.needsUpdate = true;

    // @ts-ignore
    window.asdfasdf = this.generatorGeometry.attributes;

    this.basicEdges.geometry = this.generatorGeometry;
    this.thickEdges.geometry = this.thickLineGeometry.fromLineSegments(this.basicEdges);
    if (this.thickEdges.parent !== model) {
      model.add(this.thickEdges);
    }
  }

  private initializeEdgesObject() {
    this.thickEdges.material.polygonOffset = true;
    this.thickEdges.material.polygonOffsetFactor = -2;
    this.thickEdges.material.polygonOffsetUnits = 1;
    this.thickEdges.renderOrder = 3;
  }

  private initializeEdgesGeometry() {
    // create line geometry with enough data to hold 100000 segments
    const linePosAttr = new BufferAttribute(new Float32Array(300000), 3, false);
    linePosAttr.setUsage(DynamicDrawUsage);
    this.generatorGeometry.setAttribute('position', linePosAttr);
    this.basicEdges.geometry = this.generatorGeometry;
  }
}
