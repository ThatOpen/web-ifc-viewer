// Math Functions
// https://www.geeksforgeeks.org/convex-hull-set-2-graham-scan/
import { Line3, Vector3 } from 'three';

export class SelectionWindowMath {
  private p0 = new Vector3();

  getConvexHull = (points: Vector3[]) => {
    // find the lowest point in 2d
    let lowestY = Infinity;
    let lowestIndex = -1;
    for (let i = 0, l = points.length; i < l; i++) {
      const p = points[i];
      if (p.y < lowestY) {
        lowestIndex = i;
        lowestY = p.y;
      }
    }

    // sort the points
    this.p0 = points[lowestIndex];
    points[lowestIndex] = points[0];
    points[0] = this.p0;

    points = points.sort(this.compare);

    // filter the points
    let m = 1;
    const n = points.length;
    for (let i = 1; i < n; i++) {
      while (i < n - 1 && this.orientation(this.p0, points[i], points[i + 1]) === 0) {
        i++;
      }

      points[m] = points[i];
      m++;
    }

    // early out if we don't have enough points for a hull
    if (m < 3) return null;

    // generate the hull
    const hull = [points[0], points[1], points[2]];
    for (let i = 3; i < m; i++) {
      while (this.orientation(hull[hull.length - 2], hull[hull.length - 1], points[i]) !== 2) {
        hull.pop();
      }

      hull.push(points[i]);
    }

    return hull;
  };

  orientation = (p: Vector3, q: Vector3, r: Vector3) => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (val === 0) {
      return 0; // colinear
    }

    // clock or counterclock wise
    return val > 0 ? 1 : 2;
  };

  distSq = (p1: Vector3, p2: Vector3) => {
    return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
  };

  compare = (p1: Vector3, p2: Vector3) => {
    // Find orientation
    const o = this.orientation(this.p0, p1, p2);
    if (o === 0) return this.distSq(this.p0, p2) >= this.distSq(this.p0, p1) ? -1 : 1;

    return o === 2 ? -1 : 1;
  };

  pointRayCrossesLine = (
    point: Vector3,
    line: Line3,
    prevDirection: boolean,
    thisDirection: boolean
  ) => {
    const { start, end } = line;
    const px = point.x;
    const py = point.y;

    const sy = start.y;
    const ey = end.y;

    if (sy === ey) return false;

    if (py > sy && py > ey) return false; // above
    if (py < sy && py < ey) return false; // below

    const sx = start.x;
    const ex = end.x;
    if (px > sx && px > ex) return false; // right
    if (px < sx && px < ex) {
      // left

      if (py === sy && prevDirection !== thisDirection) {
        return false;
      }

      return true;
    }

    // check the side
    const dx = ex - sx;
    const dy = ey - sy;
    const perpx = dy;
    const perpy = -dx;

    const pdx = px - sx;
    const pdy = py - sy;

    const dot = perpx * pdx + perpy * pdy;

    if (Math.sign(dot) !== Math.sign(perpx)) {
      return true;
    }

    return false;
  };

  pointRayCrossesSegments = (point: Vector3, segments: Line3[]) => {
    let crossings = 0;
    const firstSeg = segments[segments.length - 1];
    let prevDirection = firstSeg.start.y > firstSeg.end.y;
    for (let s = 0, l = segments.length; s < l; s++) {
      const line = segments[s];
      const thisDirection = line.start.y > line.end.y;
      if (this.pointRayCrossesLine(point, line, prevDirection, thisDirection)) {
        crossings++;
      }

      prevDirection = thisDirection;
    }

    return crossings;
  };

  // https://stackoverflow.com/questions/3838329/how-can-i-check-if-two-segments-intersect
  lineCrossesLine = (l1: Line3, l2: Line3) => {
    const A = l1.start;
    const B = l1.end;

    const C = l2.start;
    const D = l2.end;

    return this.ccw(A, C, D) !== this.ccw(B, C, D) && this.ccw(A, B, C) !== this.ccw(A, B, D);
  };

  ccw = (A: Vector3, B: Vector3, C: Vector3) => {
    return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
  };
}
