// Source: https://gkjohnson.github.io/three-mesh-bvh/example/bundle/selection.html
// https://github.com/gkjohnson/three-mesh-bvh/blob/master/example/selection.js

import {
  Float32BufferAttribute,
  Line,
  Line3,
  MathUtils,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  TorusKnotBufferGeometry,
  Vector3
} from 'three';
import { NOT_INTERSECTED, INTERSECTED, CONTAINED } from 'three-mesh-bvh';
import { IfcContext } from '../context';
import { SelectionWindowMath } from './selection-window-math';

export class SelectionWindow {
  selectionColor = 0xff9800;

  private isDragging = false;

  private selectionShape = new Line();
  private selectionShapeInitialized = false;

  private selectionPoints: any[] = [];

  private prevX = -Infinity;
  private prevY = -Infinity;
  private startX = -Infinity;
  private startY = -Infinity;

  private toScreenSpaceMatrix = new Matrix4();
  private boxPoints: Vector3[] = new Array(8).fill(new Vector3());
  private boxLines: Line3[] = new Array(12).fill(new Vector3());
  private lassoSegments: any[] = [];
  private perBoundsSegments: any[] = [];
  private indices: any[] = [];

  private params = {
    selectModel: false,
    selectionMode: 'intersection'
  };

  private math = new SelectionWindowMath();

  // temp

  private mesh = new Mesh(
    new TorusKnotBufferGeometry(1.5, 0.5, 500, 60).toNonIndexed(),
    new MeshStandardMaterial({
      polygonOffset: true,
      polygonOffsetFactor: 1
    })
  );

  private highlightMesh = new Mesh();

  constructor(private context: IfcContext) {
    console.log(this.context);
    console.log(this.prevX);
    console.log(this.prevY);
  }

  startSelection(e: PointerEvent) {
    this.initializeSelectionShape();

    this.prevX = e.clientX;
    this.prevY = e.clientY;
    this.startX = (e.clientX / window.innerWidth) * 2 - 1;
    this.startY = -((e.clientY / window.innerHeight) * 2 - 1);

    this.selectionPoints.length = 0;

    // this.selectionShape.visible = true;
    this.isDragging = true;
  }

  updateSelection(e: PointerEvent) {
    if (!this.isDragging) return;

    const ex = e.clientX;
    const ey = e.clientY;

    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -((e.clientY / window.innerHeight) * 2 - 1);

    this.selectionPoints[0] = this.startX;
    this.selectionPoints[1] = this.startY;
    this.selectionPoints[2] = 0;

    this.selectionPoints[3] = nx;
    this.selectionPoints[4] = this.startY;
    this.selectionPoints[5] = 0;

    this.selectionPoints[6] = nx;
    this.selectionPoints[7] = ny;
    this.selectionPoints[8] = 0;

    this.selectionPoints[9] = this.startX;
    this.selectionPoints[10] = ny;
    this.selectionPoints[11] = 0;

    this.selectionPoints[12] = this.startX;
    this.selectionPoints[13] = this.startY;
    this.selectionPoints[14] = 0;

    this.prevX = ex;
    this.prevY = ey;

    this.selectionShape.geometry.setAttribute(
      'position',
      new Float32BufferAttribute(this.selectionPoints, 3, false)
    );

    this.selectionShape.geometry.attributes.position.needsUpdate = true;

    const camera = this.context.getCamera() as PerspectiveCamera;
    const yScale = Math.tan((MathUtils.DEG2RAD * camera.fov) / 2) * this.selectionShape.position.z;
    this.selectionShape.scale.set(-yScale * camera.aspect, -yScale, 1);
  }

  endSelection() {
    this.updateSelectedGeometry();

    // this.selectionShape.visible = false;
    console.log(this.selectionPoints);
    this.isDragging = false;
  }

  private updateSelectedGeometry() {
    const camera = this.context.getCamera();

    this.toScreenSpaceMatrix
      .copy(this.mesh.matrixWorld)
      .premultiply(camera.matrixWorldInverse)
      .premultiply(camera.projectionMatrix);

    // create scratch points and lines to use for selection
    while (this.lassoSegments.length < this.selectionPoints.length) {
      this.lassoSegments.push(new Line3());
    }

    this.lassoSegments.length = this.selectionPoints.length;

    for (let s = 0, l = this.selectionPoints.length; s < l; s += 3) {
      const line = this.lassoSegments[s];
      const sNext = (s + 3) % l;
      line.start.x = this.selectionPoints[s];
      line.start.y = this.selectionPoints[s + 1];

      line.end.x = this.selectionPoints[sNext];
      line.end.y = this.selectionPoints[sNext + 1];
    }

    this.indices = [];
    this.shapeCast();
    console.log(this.indices);
  }

  private shapeCast() {
    if (!this.mesh.geometry.boundsTree) {
      this.mesh.geometry.computeBoundsTree();
    }

    if (!this.mesh.geometry.boundsTree) return;

    this.mesh.geometry.boundsTree.shapecast({
      intersectsBounds: (box, _isLeaf, _score, depth) => {
        // Get the bounding box points
        const { min, max } = box;
        let index = 0;

        let minY = Infinity;
        let maxY = -Infinity;
        let minX = Infinity;
        for (let x = 0; x <= 1; x++) {
          for (let y = 0; y <= 1; y++) {
            for (let z = 0; z <= 1; z++) {
              const v = this.boxPoints[index];
              v.x = x === 0 ? min.x : max.x;
              v.y = y === 0 ? min.y : max.y;
              v.z = z === 0 ? min.z : max.z;
              (v as any).w = 1;
              v.applyMatrix4(this.toScreenSpaceMatrix);
              index++;

              if (v.y < minY) minY = v.y;
              if (v.y > maxY) maxY = v.y;
              if (v.x < minX) minX = v.x;
            }
          }
        }

        // Find all the relevant segments here and cache them in the above array for
        // subsequent child checks to use.
        const parentSegments = this.perBoundsSegments[depth - 1] || this.lassoSegments;
        const segmentsToCheck = this.perBoundsSegments[depth] || [];
        segmentsToCheck.length = 0;
        this.perBoundsSegments[depth] = segmentsToCheck;
        for (let i = 0, l = parentSegments.length; i < l; i++) {
          const line = parentSegments[i];
          const sx = line.start.x;
          const sy = line.start.y;
          const ex = line.end.x;
          const ey = line.end.y;
          if (sx < minX && ex < minX) continue;

          const startAbove = sy > maxY;
          const endAbove = ey > maxY;
          if (startAbove && endAbove) continue;

          const startBelow = sy < minY;
          const endBelow = ey < minY;
          if (startBelow && endBelow) continue;

          segmentsToCheck.push(line);
        }

        if (segmentsToCheck.length === 0) {
          return NOT_INTERSECTED;
        }

        // Get the screen space hull lines
        const hull = this.math.getConvexHull(this.boxPoints);
        if (!hull) {
          return NOT_INTERSECTED;
        }

        const lines = hull.map((p, i) => {
          const nextP = hull[(i + 1) % hull.length];
          const line = this.boxLines[i];
          line.start.copy(p);
          line.end.copy(nextP);
          return line;
        });

        // If a lasso point is inside the hull then it's intersected and cannot be contained
        if (this.math.pointRayCrossesSegments(segmentsToCheck[0].start, lines) % 2 === 1) {
          return INTERSECTED;
        }

        // check if the screen space hull is in the lasso
        let crossings = 0;
        for (let i = 0, l = hull.length; i < l; i++) {
          const v = hull[i];
          const pCrossings = this.math.pointRayCrossesSegments(v, segmentsToCheck);

          if (i === 0) {
            crossings = pCrossings;
          }

          // if two points on the hull have different amounts of crossings then
          // it can only be intersected
          if (crossings !== pCrossings) {
            return INTERSECTED;
          }
        }

        // check if there are any intersections
        for (let i = 0, l = lines.length; i < l; i++) {
          const boxLine = lines[i];
          for (let s = 0, ls = segmentsToCheck.length; s < ls; s++) {
            if (this.math.lineCrossesLine(boxLine, segmentsToCheck[s])) {
              return INTERSECTED;
            }
          }
        }

        return crossings % 2 === 0 ? NOT_INTERSECTED : CONTAINED;
      },

      intersectsTriangle: (tri, index, contained, depth) => {
        const i3 = index * 3;
        const a = i3 + 0;
        const b = i3 + 1;
        const c = i3 + 2;

        // if the parent bounds were marked as contained
        if (contained) {
          this.indices.push(a, b, c);
          return this.params.selectModel;
        }

        // check all the segments if using no bounds tree
        const segmentsToCheck = this.perBoundsSegments[depth];
        if (this.params.selectionMode === 'centroid') {
          // get the center of the triangle
          const centroid = tri.a
            .add(tri.b)
            .add(tri.c)
            .multiplyScalar(1 / 3);
          centroid.applyMatrix4(this.toScreenSpaceMatrix);

          // counting the crossings
          const crossings = this.math.pointRayCrossesSegments(centroid, segmentsToCheck);
          if (crossings % 2 === 1) {
            this.indices.push(a, b, c);
            return this.params.selectModel;
          }
        } else if (this.params.selectionMode === 'intersection') {
          // get the projected vertices
          const vertices = [tri.a, tri.b, tri.c];

          for (let j = 0; j < 3; j++) {
            const v = vertices[j];
            v.applyMatrix4(this.toScreenSpaceMatrix);

            const crossings = this.math.pointRayCrossesSegments(v, segmentsToCheck);
            if (crossings % 2 === 1) {
              this.indices.push(a, b, c);
              return this.params.selectModel;
            }
          }

          // get the lines for the triangle
          const lines = [this.boxLines[0], this.boxLines[1], this.boxLines[2]];

          lines[0].start.copy(tri.a);
          lines[0].end.copy(tri.b);

          lines[1].start.copy(tri.b);
          lines[1].end.copy(tri.c);

          lines[2].start.copy(tri.c);
          lines[2].end.copy(tri.a);

          for (let i = 0; i < 3; i++) {
            const l = lines[i];
            for (let s = 0, sl = segmentsToCheck.length; s < sl; s++) {
              if (this.math.lineCrossesLine(l, segmentsToCheck[s])) {
                this.indices.push(a, b, c);
                return this.params.selectModel;
              }
            }
          }
        }

        return false;
      }
    });
  }

  private initializeSelectionShape() {
    if (this.selectionShapeInitialized) return;

    console.log(this.mesh);

    const selectionShapeMaterial = this.selectionShape.material as MeshBasicMaterial;
    selectionShapeMaterial.color.set(this.selectionColor).convertSRGBToLinear();
    selectionShapeMaterial.depthTest = false;

    this.selectionShape.renderOrder = 1;
    this.selectionShape.position.z = -1;
    this.selectionShape.scale.setScalar(1);
    // this.selectionShape.visible = false;
    this.selectionShape.frustumCulled = false;

    const camera = this.context.getCamera();
    const scene = this.context.getScene();

    camera.add(this.selectionShape);
    scene.add(camera);
    scene.add(this.mesh);

    this.highlightMesh.geometry = this.mesh.geometry.clone();
    this.highlightMesh.geometry.drawRange.count = 0;
    this.highlightMesh.material = new MeshBasicMaterial({
      opacity: 0.05,
      transparent: true,
      depthWrite: false
    });
    (this.highlightMesh.material as MeshBasicMaterial).color.set(0xff9800).convertSRGBToLinear();
    this.highlightMesh.renderOrder = 1;
  }
}
