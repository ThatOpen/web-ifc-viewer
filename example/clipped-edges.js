import * as THREE from 'three';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

// Source: https://gkjohnson.github.io/three-mesh-bvh/example/bundle/clippedEdges.html
export function drawClippingEdges(model, scene, clippingPlane) {

  // create line geometry with enough data to hold 100000 segments
  const lineGeometry = new THREE.BufferGeometry();
  const linePosAttr = new THREE.BufferAttribute( new Float32Array( 300000 ), 3, false );
  linePosAttr.setUsage( THREE.DynamicDrawUsage );
  lineGeometry.setAttribute( 'position', linePosAttr );
  const outlineLines = new THREE.LineSegments( lineGeometry, new THREE.LineBasicMaterial() );
  outlineLines.material.color.set( 0x00acc1 ).convertSRGBToLinear();
  outlineLines.frustumCulled = false;
  outlineLines.renderOrder = 3;

  const inverseMatrix = new THREE.Matrix4();
  const localPlane = new THREE.Plane();
  const tempLine = new THREE.Line3();
  const tempVector = new THREE.Vector3();

  inverseMatrix.copy( model.matrixWorld ).invert();
  localPlane.copy( clippingPlane ).applyMatrix4( inverseMatrix );

  let index = 0;
  const posAttr = outlineLines.geometry.attributes.position;

  model.geometry.boundsTree.shapecast( {

    intersectsBounds: box => {
      return localPlane.intersectsBox( box );
    },

    intersectsTriangle: tri => {
      // check each triangle edge to see if it intersects with the plane. If so then
      // add it to the list of segments.
      let count = 0;
      tempLine.start.copy( tri.a );
      tempLine.end.copy( tri.b );
      if ( localPlane.intersectLine( tempLine, tempVector ) ) {
        posAttr.setXYZ( index, tempVector.x, tempVector.y, tempVector.z );
        index ++;
        count ++;
      }

      tempLine.start.copy( tri.b );
      tempLine.end.copy( tri.c );
      if ( localPlane.intersectLine( tempLine, tempVector ) ) {
        posAttr.setXYZ( index, tempVector.x, tempVector.y, tempVector.z );
        count ++;
        index ++;
      }

      tempLine.start.copy( tri.c );
      tempLine.end.copy( tri.a );
      if ( localPlane.intersectLine( tempLine, tempVector ) ) {
        posAttr.setXYZ( index, tempVector.x, tempVector.y, tempVector.z );
        count ++;
        index ++;
      }

      // If we only intersected with one or three sides then just remove it. This could be handled
      // more gracefully.
      if ( count !== 2 ) {
        index -= count;
      }
    },
  } );

  // set the draw range to only the new segments and offset the lines so they don't intersect with the geometry
  outlineLines.geometry.setDrawRange( 0, index );
  outlineLines.position.copy( clippingPlane.normal ).multiplyScalar( - 0.00001 );
  posAttr.needsUpdate = true;

  const thickLineGeom = new LineSegmentsGeometry().fromLineSegments(outlineLines);
  const thickLines = new LineSegments2( thickLineGeom, new LineMaterial( { color: 0x000000, linewidth: 0.001 } ) );
  thickLines.material.polygonOffset = true;
  thickLines.material.polygonOffsetFactor = -2;
  thickLines.material.polygonOffsetUnits = 1;
  thickLines.renderOrder = 3;
  scene.add(thickLines);
}