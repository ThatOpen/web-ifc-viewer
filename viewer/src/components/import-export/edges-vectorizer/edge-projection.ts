import * as THREE from 'three';
import { LineSegments, Mesh, Scene } from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { MeshBVH } from 'three-mesh-bvh';
import { IfcContext } from '../../context';
import {
  compressEdgeOverlaps,
  edgesToGeometry,
  generateEdges,
  getProjectedOverlaps,
  isLineAbovePlane,
  isLineTriangleEdge,
  isYProjectedLineDegenerate,
  isYProjectedTriangleDegenerate,
  overlapsToLines,
  trimToBeneathTriPlane
} from './edgeUtils';

// Source: https://github.com/gkjohnson/three-mesh-bvh/blob/master/example/edgeProjection.js

export class EdgeProjector {
  params = {
    displayModel: 'color',
    displayEdges: false,
    displayProjection: true,
    useBVH: true,
    sortEdges: true,
    amount: 50,
    color: 0x030303
  };

  projectedEdges: LineSegments[] = [];

  constructor(private context: IfcContext) {}

  dispose() {
    this.projectedEdges.forEach((edge) => {
      edge.geometry.dispose();
      if (Array.isArray(edge.material)) edge.material.forEach((mat) => mat.dispose());
      else edge.material.dispose();
    });

    this.projectedEdges = [];
  }

  async projectEdges(model: Mesh) {
    const scene = this.context.getScene();

    // create projection display mesh
    const projection = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: this.params.color })
    );

    let task: any = this.updateEdges(scene, this.params, model, projection);

    while (task) {
      const res = task.next();
      if (res.done) {
        task = null;
      }
    }

    this.projectedEdges.push(projection);

    return projection;
  }

  *updateEdges(scene: Scene, params: any, model: any, projection: any) {
    scene.remove(projection);

    // transform and merge geometries to project into a single model
    const geometries = [];
    model.updateWorldMatrix(true, true);

    const clone = model.geometry.clone();
    clone.applyMatrix4(model.matrixWorld);
    for (const key in clone.attributes) {
      if (key !== 'position') {
        clone.deleteAttribute(key);
      }
    }
    geometries.push(clone);
    const mergedGeometry = mergeBufferGeometries(geometries, false);

    geometries.length = 0;
    clone.dispose();

    yield;

    // generate the bvh for acceleration
    const bvh = new MeshBVH(mergedGeometry);

    yield;

    // generate the candidate edges
    const edges = generateEdges(mergedGeometry, new THREE.Vector3(0, 1, 0), 50);

    if (params.sortEdges) {
      edges.sort((a, b) => {
        return Math.min(a.start.y, a.end.y) - Math.min(b.start.y, b.end.y);
      });
    }

    yield;

    scene.add(projection);

    // trim the candidate edges
    const finalEdges: any[] = [];
    const tempLine = new THREE.Line3();
    const tempRay = new THREE.Ray();
    const tempVec = new THREE.Vector3();

    for (let i = 0, l = edges.length; i < l; i++) {
      const line = edges[i];
      if (isYProjectedLineDegenerate(line)) {
        continue;
      }

      const lowestLineY = Math.min(line.start.y, line.end.y);
      const overlaps: any[] = [];
      bvh.shapecast({
        intersectsBounds: (box) => {
          if (!params.useBVH) {
            return true;
          }

          // check if the box bounds are above the lowest line point
          box.min.y = Math.min(lowestLineY, box.min.y);
          tempRay.origin.copy(line.start);
          line.delta(tempRay.direction).normalize();

          if (box.containsPoint(tempRay.origin)) {
            return true;
          }

          if (tempRay.intersectBox(box, tempVec)) {
            return tempRay.origin.distanceToSquared(tempVec) < line.distanceSq();
          }

          return false;
        },

        intersectsTriangle: (tri: any) => {
          // skip the triangle if it is completely below the line
          const highestTriangleY = Math.max(tri.a.y, tri.b.y, tri.c.y);

          if (highestTriangleY < lowestLineY) {
            return false;
          }

          // if the projected triangle is just a line then don't check it
          if (isYProjectedTriangleDegenerate(tri)) {
            return false;
          }

          // if this line lies on a triangle edge then don't check it
          if (isLineTriangleEdge(tri, line)) {
            return false;
          }

          trimToBeneathTriPlane(tri, line, tempLine);

          if (isLineAbovePlane(tri.plane, tempLine)) {
            return false;
          }

          if (tempLine.distance() < 1e-10) {
            return false;
          }

          // compress the edge overlaps so we can easily tell if the whole edge is hidden already
          // and exit early
          if (getProjectedOverlaps(tri, line, overlaps)) {
            compressEdgeOverlaps(overlaps);
          }

          // if we're hiding the edge entirely now then skip further checks
          if (overlaps.length !== 0) {
            const [d0, d1] = overlaps[overlaps.length - 1];
            return d0 === 0.0 && d1 === 1.0;
          }

          return false;
        }
      });

      overlapsToLines(line, overlaps, finalEdges);
    }

    projection.geometry.dispose();
    projection.geometry = edgesToGeometry(finalEdges, 0);
  }
}
