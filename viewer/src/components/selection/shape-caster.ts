import { CONTAINED, INTERSECTED, NOT_INTERSECTED } from 'three-mesh-bvh';
import { Box3, Line3, Matrix4, Mesh, Vector3 } from 'three';
import { SelectionBoxMath } from './selection-window-math';

export class ShapeCaster {
  boxPoints = new Array(8).fill(0).map(() => new Vector3());
  boxLines = new Array(12).fill(0).map(() => new Line3());
  perBoundsSegments: any[] = [];
  math = new SelectionBoxMath();
  selectModel = false;
  useBoundsTree = true;
  selectionMode = 'intersection';

  constructor(private toScreenSpaceMatrix: Matrix4, private lassoSegments: any) {}

  shapeCast(mesh: Mesh, indices: number[]) {
    if (!mesh.geometry.boundsTree) {
      throw new Error('Geometry must have BVH applied!');
    }

    mesh.geometry.boundsTree.shapecast({
      intersectsBounds: (
        box: Box3,
        _isLeaf: boolean,
        _score: number | undefined,
        depth: number
      ) => {
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
              // @ts-ignore
              v.w = 1;
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
        const segmentsToCheck: any[] = this.perBoundsSegments[depth] || [];
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
        if (!hull) return NOT_INTERSECTED;
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
        const a = i3;
        const b = i3 + 1;
        const c = i3 + 2;

        // if the parent bounds were marked as contained
        if (contained) {
          indices.push(a, b, c);
          return this.selectModel;
        }

        // check all the segments if using no bounds tree
        const segmentsToCheck = this.useBoundsTree
          ? this.perBoundsSegments[depth]
          : this.lassoSegments;
        if (this.selectionMode === 'centroid') {
          // get the center of the triangle
          const centroid = tri.a
            .add(tri.b)
            .add(tri.c)
            .multiplyScalar(1 / 3);
          centroid.applyMatrix4(this.toScreenSpaceMatrix);

          // counting the crossings
          const crossings = this.math.pointRayCrossesSegments(centroid, segmentsToCheck);
          if (crossings % 2 === 1) {
            indices.push(a, b, c);
            return this.selectModel;
          }
        } else if (this.selectionMode === 'intersection') {
          // get the projected vertices
          const vertices = [tri.a, tri.b, tri.c];

          for (let j = 0; j < 3; j++) {
            const v = vertices[j];
            v.applyMatrix4(this.toScreenSpaceMatrix);

            const crossings = this.math.pointRayCrossesSegments(v, segmentsToCheck);
            if (crossings % 2 === 1) {
              indices.push(a, b, c);
              return this.selectModel;
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
                indices.push(a, b, c);
                return this.selectModel;
              }
            }
          }
        }

        return false;
      }
    });
  }
}
