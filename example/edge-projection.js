import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshBVH } from 'three-mesh-bvh';
import {
  generateEdges,
  isLineAbovePlane,
  isYProjectedTriangleDegenerate,
  isLineTriangleEdge,
  trimToBeneathTriPlane,
  edgesToGeometry,
  overlapsToLines,
  getProjectedOverlaps,
  isYProjectedLineDegenerate,
  compressEdgeOverlaps,
} from './edgeUtils.js';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const params = {
  displayModel: 'color',
  displayEdges: false,
  displayProjection: true,
  useBVH: true,
  sortEdges: true,
  rotate: () => {

  },
  regenerate: () => {

  },
};

let lines, model, projection, group, whiteModel;
let task = null;


export async function projectEdges(scene, bimModel) {

  model = bimModel;

  // generate geometry line segments
  lines = new THREE.Group();

  const geomLines = new THREE.LineSegments( new THREE.EdgesGeometry( model.geometry, 50 ), new THREE.LineBasicMaterial( { color: 0x030303 } ) );
  geomLines.position.copy( model.position );
  geomLines.quaternion.copy( model.quaternion );
  geomLines.scale.copy( model.scale );
  geomLines.visible = false;
  lines.add( geomLines );

  scene.add( lines );

  // create projection display mesh
  projection = new THREE.LineSegments( new THREE.BufferGeometry(), new THREE.LineBasicMaterial( { color: 0x030303 } ) );
  scene.add( projection );

  task = updateEdges(scene);

  while ( task ) {

    const res = task.next();
    if ( res.done ) {

      task = null;

    }

  }

}

function* updateEdges(scene) {

  scene.remove( projection );

  // transform and merge geometries to project into a single model
  const geometries = [];
  model.updateWorldMatrix( true, true );

  const clone = model.geometry.clone();
  clone.applyMatrix4( model.matrixWorld );
  for ( const key in clone.attributes ) {

    if ( key !== 'position' ) {
      clone.deleteAttribute( key );
    }

  }
  geometries.push( clone );
  const mergedGeometry = mergeBufferGeometries( geometries, false );

  yield;

  // generate the bvh for acceleration
  const bvh = new MeshBVH( mergedGeometry );

  yield;

  // generate the candidtate edges
  const edges = generateEdges( mergedGeometry, new THREE.Vector3( 0, 1, 0 ), 50 );

  if ( params.sortEdges ) {

    edges.sort( ( a, b ) => {

      return Math.min( a.start.y, a.end.y ) - Math.min( b.start.y, b.end.y );

    } );

  }

  yield;

  scene.add( projection );

  // trim the candidate edges
  const finalEdges = [];
  const tempLine = new THREE.Line3();
  const tempRay = new THREE.Ray();
  const tempVec = new THREE.Vector3();

  for ( let i = 0, l = edges.length; i < l; i ++ ) {

    const line = edges[ i ];
    if ( isYProjectedLineDegenerate( line ) ) {

      continue;

    }

    const lowestLineY = Math.min( line.start.y, line.end.y );
    const overlaps = [];
    bvh.shapecast( {

      intersectsBounds: box => {

        if ( ! params.useBVH ) {

          return true;

        }

        // check if the box bounds are above the lowest line point
        box.min.y = Math.min( lowestLineY, box.min.y );
        tempRay.origin.copy( line.start );
        line.delta( tempRay.direction ).normalize();

        if ( box.containsPoint( tempRay.origin ) ) {

          return true;

        }

        if ( tempRay.intersectBox( box, tempVec ) ) {

          return tempRay.origin.distanceToSquared( tempVec ) < line.distanceSq();

        }

        return false;

      },

      intersectsTriangle: tri => {

        // skip the triangle if it is completely below the line
        const highestTriangleY = Math.max( tri.a.y, tri.b.y, tri.c.y );

        if ( highestTriangleY < lowestLineY ) {

          return false;

        }

        // if the projected triangle is just a line then don't check it
        if ( isYProjectedTriangleDegenerate( tri ) ) {

          return false;

        }

        // if this line lies on a triangle edge then don't check it
        if ( isLineTriangleEdge( tri, line ) ) {

          return false;

        }

        trimToBeneathTriPlane( tri, line, tempLine );

        if ( isLineAbovePlane( tri.plane, tempLine ) ) {

          return false;

        }

        if ( tempLine.distance() < 1e-10 ) {

          return false;

        }

        // compress the edge overlaps so we can easily tell if the whole edge is hidden already
        // and exit early
        if ( getProjectedOverlaps( tri, line, overlaps ) ) {

          compressEdgeOverlaps( overlaps );

        }

        // if we're hiding the edge entirely now then skip further checks
        if ( overlaps.length !== 0 ) {

          const [ d0, d1 ] = overlaps[ overlaps.length - 1 ];
          return d0 === 0.0 && d1 === 1.0;

        }

        return false;

      },

    } );

    overlapsToLines( line, overlaps, finalEdges );


  }

  projection.geometry.dispose();
  projection.geometry = edgesToGeometry( finalEdges, 0 );

}