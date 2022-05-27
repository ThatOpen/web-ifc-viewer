import * as THREE from 'three';
import { CONTAINED, INTERSECTED, NOT_INTERSECTED, } from 'three-mesh-bvh';

export class SelectionWindow {
  toolMode = 'lasso';
  liveUpdate = false;
  wireframe = false;
  displayHelper = false;
  helperDepth = 10;
  rotate = true;

  selectionShape = new THREE.Line();

  selectionPoints = [];
  dragging = false;
  selectionShapeNeedsUpdate = false;
  selectionNeedsUpdate = false;

  // handle building lasso shape
  startX = - Infinity;
  startY = - Infinity;
  prevX = - Infinity;
  prevY = - Infinity;

  tempVec0 = new THREE.Vector2();
  tempVec1 = new THREE.Vector2();
  tempVec2 = new THREE.Vector2();

  toScreenSpaceMatrix = new THREE.Matrix4();
  lassoSegments = [];

  caster = new ShapeCaster(this.toScreenSpaceMatrix, this.lassoSegments);

  constructor(scene, camera, meshes, onSelectedCallback) {
    this.scene = scene;
    this.camera = camera;
    this.meshes = meshes;
    this.onSelected = onSelectedCallback;

    this.setupSelectionShape();
    this.updateAll(meshes);
  }

  setupSelectionShape() {
    this.selectionShape = new THREE.Line();
    this.selectionShape.material.color.set( 0xff9800 ).convertSRGBToLinear();
    this.selectionShape.renderOrder = 1;
    this.selectionShape.position.z = - .2;
    this.selectionShape.depthTest = false;
    this.selectionShape.scale.setScalar( 1 );
    this.selectionShape.frustumCulled = false;
    this.camera.add( this.selectionShape );
  }

  onDragStarted(pointerEvent) {
    this.prevX = pointerEvent.clientX;
    this.prevY = pointerEvent.clientY;
    this.startX = ( pointerEvent.clientX / window.innerWidth ) * 2 - 1;
    this.startY = - ( ( pointerEvent.clientY / window.innerHeight ) * 2 - 1 );
    this.selectionPoints.length = 0;
    this.dragging = true;

    const yScale = Math.tan( THREE.MathUtils.DEG2RAD * this.camera.fov / 2 ) * this.selectionShape.position.z;
    this.selectionShape.scale.set( - yScale * this.camera.aspect, - yScale, 1 );
  }

  onDragFinished() {
    this.selectionShape.visible = false;
    this.dragging = false;
    if ( this.selectionPoints.length ) {

      this.selectionNeedsUpdate = true;

    }

    this.updateAll(this.meshes);
  }

  onDrag(pointerEvent) {
    // If the left mouse button is not pressed
    if ( ( 1 & pointerEvent.buttons ) === 0 ) {

      return;

    }

    const ex = pointerEvent.clientX;
    const ey = pointerEvent.clientY;

    const nx = ( pointerEvent.clientX / window.innerWidth ) * 2 - 1;
    const ny = - ( ( pointerEvent.clientY / window.innerHeight ) * 2 - 1 );

    if ( this.toolMode === 'box' ) {

      // set points for the corner of the box
      this.selectionPoints.length = 3 * 5;

      this.selectionPoints[ 0 ] = this.startX;
      this.selectionPoints[ 1 ] = this.startY;
      this.selectionPoints[ 2 ] = 0;

      this.selectionPoints[ 3 ] = nx;
      this.selectionPoints[ 4 ] = this.startY;
      this.selectionPoints[ 5 ] = 0;

      this.selectionPoints[ 6 ] = nx;
      this.selectionPoints[ 7 ] = ny;
      this.selectionPoints[ 8 ] = 0;

      this.selectionPoints[ 9 ] = this.startX;
      this.selectionPoints[ 10 ] = ny;
      this.selectionPoints[ 11 ] = 0;

      this.selectionPoints[ 12 ] = this.startX;
      this.selectionPoints[ 13 ] = this.startY;
      this.selectionPoints[ 14 ] = 0;

      if ( ex !== this.prevX || ey !== this.prevY ) {
        this.selectionShapeNeedsUpdate = true;
      }

      this.prevX = ex;
      this.prevY = ey;
      this.selectionShape.visible = true;
      if ( this.liveUpdate ) {
        this.selectionNeedsUpdate = true;
      }

    } else {

      // If the mouse hasn't moved a lot since the last point
      if (
        Math.abs( ex - this.prevX ) >= 3 ||
        Math.abs( ey - this.prevY ) >= 3
      ) {

        // Check if the mouse moved in roughly the same direction as the previous point
        // and replace it if so.
        const i = ( this.selectionPoints.length / 3 ) - 1;
        const i3 = i * 3;
        let doReplace = false;
        if ( this.selectionPoints.length > 3 ) {

          // prev segment direction
          this.tempVec0.set( this.selectionPoints[ i3 - 3 ], this.selectionPoints[ i3 - 3 + 1 ] );
          this.tempVec1.set( this.selectionPoints[ i3 ], this.selectionPoints[ i3 + 1 ] );
          this.tempVec1.sub( this.tempVec0 ).normalize();

          // this segment direction
          this.tempVec0.set( this.selectionPoints[ i3 ], this.selectionPoints[ i3 + 1 ] );
          this.tempVec2.set( nx, ny );
          this.tempVec2.sub( this.tempVec0 ).normalize();

          const dot = this.tempVec1.dot( this.tempVec2 );
          doReplace = dot > 0.99;

        }

        if ( doReplace ) {

          this.selectionPoints[ i3 ] = nx;
          this.selectionPoints[ i3 + 1 ] = ny;

        } else {

          this.selectionPoints.push( nx, ny, 0 );

        }

        this.selectionShapeNeedsUpdate = true;
        this.selectionShape.visible = true;

        this.prevX = ex;
        this.prevY = ey;

        if ( this.liveUpdate ) {

          this.selectionNeedsUpdate = true;

        }

      }

    }

    this.updateSelectionLasso();
  }

  updateSelectionLasso() {
    if ( this.selectionShapeNeedsUpdate ) {

      if ( this.toolMode === 'lasso' ) {

        const ogLength = this.selectionPoints.length;
        this.selectionPoints.push(
          this.selectionPoints[ 0 ],
          this.selectionPoints[ 1 ],
          this.selectionPoints[ 2 ]
        );

        this.selectionShape.geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute( this.selectionPoints, 3, false )
        );

        this.selectionPoints.length = ogLength;

      } else {

        this.selectionShape.geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute( this.selectionPoints, 3, false )
        );

      }

      this.selectionShapeNeedsUpdate = false;

    }
  }

  updateAll(meshes) {
    meshes.forEach(mesh => {
      this.update(mesh);
    })
  }

  update(mesh) {
    if ( this.selectionNeedsUpdate ) {
      this.selectionNeedsUpdate = false;
      if ( this.selectionPoints.length > 0 ) {
        this.updateSelection(mesh);
      }
    }
  }

  updateSelection(mesh) {

    // TODO: Possible improvements
    // - Correctly handle the camera near clip
    // - Improve line line intersect performance?

    this.toScreenSpaceMatrix
      .copy( mesh.matrixWorld )
      .premultiply( this.camera.matrixWorldInverse )
      .premultiply( this.camera.projectionMatrix );

    // create scratch points and lines to use for selection
    while ( this.lassoSegments.length < this.selectionPoints.length ) {

      this.lassoSegments.push( new THREE.Line3() );

    }

    this.lassoSegments.length = this.selectionPoints.length;

    for ( let s = 0, l = this.selectionPoints.length; s < l; s += 3 ) {

      const line = this.lassoSegments[ s ];
      const sNext = ( s + 3 ) % l;
      line.start.x = this.selectionPoints[ s ];
      line.start.y = this.selectionPoints[ s + 1 ];

      line.end.x = this.selectionPoints[ sNext ];
      line.end.y = this.selectionPoints[ sNext + 1 ];

    }

    const indices = [];
    this.caster.shapeCast(mesh, indices);
    this.onSelected(mesh, indices);

  }

}



class ShapeCaster {
  boxPoints = new Array( 8 ).fill(0).map( () => new THREE.Vector3() );
  boxLines = new Array( 12 ).fill(0).map( () => new THREE.Line3() );
  perBoundsSegments = [];
  math = new SelectionBoxMath();
  selectModel = false;
  useBoundsTree = true;
  selectionMode = 'intersection';

  constructor(toScreenSpaceMatrix, lassoSegments) {
    this.toScreenSpaceMatrix = toScreenSpaceMatrix;
    this.lassoSegments = lassoSegments;
  }


  shapeCast(mesh, indices) {
    mesh.geometry.boundsTree.shapecast( {
      intersectsBounds: ( box, isLeaf, score, depth ) => {


        // Get the bounding box points
        const { min, max } = box;
        let index = 0;

        let minY = Infinity;
        let maxY = - Infinity;
        let minX = Infinity;
        for ( let x = 0; x <= 1; x ++ ) {

          for ( let y = 0; y <= 1; y ++ ) {

            for ( let z = 0; z <= 1; z ++ ) {

              const v = this.boxPoints[ index ];
              v.x = x === 0 ? min.x : max.x;
              v.y = y === 0 ? min.y : max.y;
              v.z = z === 0 ? min.z : max.z;
              v.w = 1;
              v.applyMatrix4( this.toScreenSpaceMatrix );
              index ++;

              if ( v.y < minY ) minY = v.y;
              if ( v.y > maxY ) maxY = v.y;
              if ( v.x < minX ) minX = v.x;

            }

          }

        }

        // Find all the relevant segments here and cache them in the above array for
        // subsequent child checks to use.
        const parentSegments = this.perBoundsSegments[ depth - 1 ] || this.lassoSegments;
        const segmentsToCheck = this.perBoundsSegments[ depth ] || [];
        segmentsToCheck.length = 0;
        this.perBoundsSegments[ depth ] = segmentsToCheck;
        for ( let i = 0, l = parentSegments.length; i < l; i ++ ) {

          const line = parentSegments[ i ];
          const sx = line.start.x;
          const sy = line.start.y;
          const ex = line.end.x;
          const ey = line.end.y;
          if ( sx < minX && ex < minX ) continue;

          const startAbove = sy > maxY;
          const endAbove = ey > maxY;
          if ( startAbove && endAbove ) continue;

          const startBelow = sy < minY;
          const endBelow = ey < minY;
          if ( startBelow && endBelow ) continue;

          segmentsToCheck.push( line );

        }

        if ( segmentsToCheck.length === 0 ) {

          return NOT_INTERSECTED;

        }

        // Get the screen space hull lines
        const hull = this.math.getConvexHull( this.boxPoints );
        if(!hull) return;
        const lines = hull.map( ( p, i ) => {

          const nextP = hull[ ( i + 1 ) % hull.length ];
          const line = this.boxLines[ i ];
          line.start.copy( p );
          line.end.copy( nextP );
          return line;

        } );

        // If a lasso point is inside the hull then it's intersected and cannot be contained
        if ( this.math.pointRayCrossesSegments( segmentsToCheck[ 0 ].start, lines ) % 2 === 1 ) {

          return INTERSECTED;

        }

        // check if the screen space hull is in the lasso
        let crossings = 0;
        for ( let i = 0, l = hull.length; i < l; i ++ ) {

          const v = hull[ i ];
          const pCrossings = this.math.pointRayCrossesSegments( v, segmentsToCheck );

          if ( i === 0 ) {

            crossings = pCrossings;

          }

          // if two points on the hull have different amounts of crossings then
          // it can only be intersected
          if ( crossings !== pCrossings ) {

            return INTERSECTED;

          }

        }

        // check if there are any intersections
        for ( let i = 0, l = lines.length; i < l; i ++ ) {

          const boxLine = lines[ i ];
          for ( let s = 0, ls = segmentsToCheck.length; s < ls; s ++ ) {

            if ( this.math.lineCrossesLine( boxLine, segmentsToCheck[ s ] ) ) {

              return INTERSECTED;

            }

          }

        }

        return crossings % 2 === 0 ? NOT_INTERSECTED : CONTAINED;

      },

      intersectsTriangle: ( tri, index, contained, depth ) => {

        const i3 = index * 3;
        const a = i3;
        const b = i3 + 1;
        const c = i3 + 2;

        // if the parent bounds were marked as contained
        if ( contained ) {

          indices.push( a, b, c );
          return this.selectModel;

        }

        // check all the segments if using no bounds tree
        const segmentsToCheck = this.useBoundsTree ? this.perBoundsSegments[ depth ] : this.lassoSegments;
        if ( this.selectionMode === 'centroid' ) {

          // get the center of the triangle
          const centroid = tri.a.add( tri.b ).add( tri.c ).multiplyScalar( 1 / 3 );
          centroid.applyMatrix4( this.toScreenSpaceMatrix );

          // counting the crossings
          const crossings = this.math.pointRayCrossesSegments( centroid, segmentsToCheck );
          if ( crossings % 2 === 1 ) {

            indices.push( a, b, c );
            return this.selectModel;

          }

        } else if ( this.selectionMode === 'intersection' ) {

          // get the projected vertices
          const vertices = [
            tri.a,
            tri.b,
            tri.c,
          ];

          for ( let j = 0; j < 3; j ++ ) {

            const v = vertices[ j ];
            v.applyMatrix4( this.toScreenSpaceMatrix );

            const crossings = this.math.pointRayCrossesSegments( v, segmentsToCheck );
            if ( crossings % 2 === 1 ) {

              indices.push( a, b, c );
              return this.selectModel;

            }

          }

          // get the lines for the triangle
          const lines = [
            this.boxLines[ 0 ],
            this.boxLines[ 1 ],
            this.boxLines[ 2 ],
          ];

          lines[ 0 ].start.copy( tri.a );
          lines[ 0 ].end.copy( tri.b );

          lines[ 1 ].start.copy( tri.b );
          lines[ 1 ].end.copy( tri.c );

          lines[ 2 ].start.copy( tri.c );
          lines[ 2 ].end.copy( tri.a );

          for ( let i = 0; i < 3; i ++ ) {

            const l = lines[ i ];
            for ( let s = 0, sl = segmentsToCheck.length; s < sl; s ++ ) {

              if ( this.math.lineCrossesLine( l, segmentsToCheck[ s ] ) ) {

                indices.push( a, b, c );
                return this.selectModel;

              }

            }

          }

        }

        return false;

      }

    } );
  }
}

class SelectionBoxMath {
// https://www.geeksforgeeks.org/convex-hull-set-2-graham-scan/
  getConvexHull( points ) {

    function orientation( p, q, r ) {

      const val =
        ( q.y - p.y ) * ( r.x - q.x ) -
        ( q.x - p.x ) * ( r.y - q.y );

      if ( val === 0 ) {

        return 0; // colinear

      }

      // clock or counterclock wise
      return ( val > 0 ) ? 1 : 2;

    }

    function distSq( p1, p2 ) {

      return ( p1.x - p2.x ) * ( p1.x - p2.x ) +
        ( p1.y - p2.y ) * ( p1.y - p2.y );

    }

    function compare( p1, p2 ) {

      // Find orientation
      const o = orientation( p0, p1, p2 );
      if ( o === 0 )
        return ( distSq( p0, p2 ) >= distSq( p0, p1 ) ) ? - 1 : 1;

      return ( o === 2 ) ? - 1 : 1;

    }

    // find the lowest point in 2d
    let lowestY = Infinity;
    let lowestIndex = - 1;
    for ( let i = 0, l = points.length; i < l; i ++ ) {

      const p = points[ i ];
      if ( p.y < lowestY ) {

        lowestIndex = i;
        lowestY = p.y;

      }

    }

    // sort the points
    const p0 = points[ lowestIndex ];
    points[ lowestIndex ] = points[ 0 ];
    points[ 0 ] = p0;

    points = points.sort( compare );

    // filter the points
    let m = 1;
    const n = points.length;
    for ( let i = 1; i < n; i ++ ) {

      while ( i < n - 1 && orientation( p0, points[ i ], points[ i + 1 ] ) == 0 ) {

        i ++;

      }

      points[ m ] = points[ i ];
      m ++;

    }

    // early out if we don't have enough points for a hull
    if ( m < 3 ) return null;

    // generate the hull
    const hull = [ points[ 0 ], points[ 1 ], points[ 2 ] ];
    for ( let i = 3; i < m; i ++ ) {

      while ( orientation( hull[ hull.length - 2 ], hull[ hull.length - 1 ], points[ i ] ) !== 2 ) {

        hull.pop();

      }

      hull.push( points[ i ] );

    }

    return hull;

  }

  pointRayCrossesLine( point, line, prevDirection, thisDirection ) {

    const { start, end } = line;
    const px = point.x;
    const py = point.y;

    const sy = start.y;
    const ey = end.y;

    if ( sy === ey ) return false;

    if ( py > sy && py > ey ) return false; // above
    if ( py < sy && py < ey ) return false; // below

    const sx = start.x;
    const ex = end.x;
    if ( px > sx && px > ex ) return false; // right
    if ( px < sx && px < ex ) { // left

      if ( py === sy && prevDirection !== thisDirection ) {

        return false;

      }

      return true;

    }

    // check the side
    const dx = ex - sx;
    const dy = ey - sy;
    const perpx = dy;
    const perpy = - dx;

    const pdx = px - sx;
    const pdy = py - sy;

    const dot = perpx * pdx + perpy * pdy;

    if ( Math.sign( dot ) !== Math.sign( perpx ) ) {

      return true;

    }

    return false;

  }

  pointRayCrossesSegments( point, segments ) {

    let crossings = 0;
    const firstSeg = segments[ segments.length - 1 ];
    let prevDirection = firstSeg.start.y > firstSeg.end.y;
    for ( let s = 0, l = segments.length; s < l; s ++ ) {

      const line = segments[ s ];
      const thisDirection = line.start.y > line.end.y;
      if ( this.pointRayCrossesLine( point, line, prevDirection, thisDirection ) ) {

        crossings ++;

      }

      prevDirection = thisDirection;

    }

    return crossings;

  }

// https://stackoverflow.com/questions/3838329/how-can-i-check-if-two-segments-intersect
  lineCrossesLine( l1, l2 ) {

    function ccw( A, B, C ) {

      return ( C.y - A.y ) * ( B.x - A.x ) > ( B.y - A.y ) * ( C.x - A.x );

    }

    const A = l1.start;
    const B = l1.end;

    const C = l2.start;
    const D = l2.end;

    return ccw( A, C, D ) !== ccw( B, C, D ) && ccw( A, B, C ) !== ccw( A, B, D );

  }
}


