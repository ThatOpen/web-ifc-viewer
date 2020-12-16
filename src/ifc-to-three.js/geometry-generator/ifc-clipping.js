import {
  geometryTypes as g,
  namedProps as n,
  typeValue as t
} from '../../utils/global-constants.js';
import { applyTransformsTo } from '../geometry-transformer/local-transform-applier.js';
import { trackLocalTransform } from '../geometry-transformer/local-transform-tracker.js';
import { getMappedGeometry } from './geometry-map.js';
import { createClippingBox } from './three-clipping.js';
import { mainObject } from '../scene/mainObject.js';
import CSG from '../../../libs/CSGMesh.js';
import { createExtrusionsByPoints } from './three-extrusion.js';
import { ifcTypes } from '../../utils/ifc-types.js';

function mapClipping(shape, product) {
  const clippingReps = [];
  let representation = shape[n.items][0];

  while (representation[n.ifcClass] == 'IfcBooleanClippingResult') {
    clippingReps.push(representation[n.secondOperand]);
    representation = representation[n.firstOperand];
  }

  const mainBody = representation;
  const wallGeom = getMappedGeometry(mainBody, product);

  const clippingGeos = [];
  clippingReps.forEach((clippingRep) =>
    clippingGeos.push(createClippingPlane(clippingRep, product))
  );

  // Apply boolean operations usng CSGMesh
  // Delete all geometry except for the final result
  wallGeom.geometry.computeFaceNormals();
  wallGeom.updateMatrix();
  let bspA = CSG.fromMesh(wallGeom);

  for (let i = 0; i < clippingGeos.length; i++) {
    const clippingGeo = clippingGeos[i];
    clippingGeo.updateMatrix();
    let bspB = CSG.fromMesh(clippingGeo);
    bspA = bspA.subtract(bspB);
  }

  const result = CSG.toMesh(bspA, wallGeom.matrix);
  result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
  result.material = new THREE.MeshPhongMaterial();
  mainObject.remove(wallGeom);
  clippingGeos.forEach((clippingGeo) => mainObject.remove(clippingGeo));

  return result;
}

function createClippingPlane(clippingRep, product) {
  if (clippingRep[n.ifcClass].toUpperCase() === ifcTypes.IfcHalfSpaceSolid)
    return mapIfcHalfSpaceSolid(clippingRep, product);
  return mapIfcPolygonalBoundedHalfSpace(clippingRep, product);
}

function mapIfcHalfSpaceSolid(clippingRep, product) {
  const orientation = clippingRep[n.agreementFlag][t.value];
  const clippingGeom = createClippingBox(orientation);
  const position = clippingRep[n.baseSurface][n.position];
  trackLocalTransform(product, position, n.transformOfClippingVolume);
  applyTransformsTo(product, clippingGeom, n.transformOfClippingVolume);
  return clippingGeom;
}

function mapIfcPolygonalBoundedHalfSpace(clippingRep, product) {
  const orientation = clippingRep[n.agreementFlag];

  const clippingGeom = createClippingBox(orientation);
  const position = clippingRep[n.baseSurface][n.position];
  trackLocalTransform(product, position, n.transformOfClippingVolume);
  applyTransformsTo(product, clippingGeom, n.transformOfClippingVolume);

  const points = clippingRep[n.polygonalBoundary][n.points].map((point) => {
    const coords = point[n.coordinates];
    return [-coords[0], -coords[1]];
  });
  const boundingGeom = createExtrusionsByPoints(points, 100);
  trackLocalTransform(product, position, n.transformOfClippingVolume);
  applyTransformsTo(product, boundingGeom, n.transformOfClippingVolume);

  // Apply boolean operations usng CSGMesh
  clippingGeom.geometry.computeFaceNormals();
  clippingGeom.updateMatrix();
  let bspA = CSG.fromMesh(clippingGeom);

  boundingGeom.updateMatrix();
  let bspB = CSG.fromMesh(boundingGeom);
  bspA = bspA.subtract(bspB);

  const result = CSG.toMesh(bspA, clippingGeom.matrix);
  result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
  result.material = new THREE.MeshPhongMaterial();
  mainObject.remove(clippingGeom);
  mainObject.remove(boundingGeom);

  return result;
}

export { mapClipping };
