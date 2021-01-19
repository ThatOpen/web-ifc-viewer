import { applyTransformsToGeometry } from '../../geometry-transformer/local-transform-applier.js';
import { getMappedGeometry } from '../geometry-map.js';
import { createClippingBox } from '../three-geometry/three-clipping.js';
import { mainObject } from '../../scene/mainObject.js';
import CSG from '../../../../libs/CSGMesh.js';
import { createExtrusionsByPoints } from '../three-geometry/three-extrusion.js';
import { ifcTypes } from '../../../utils/ifc-types.js';
import { namedProps as n, typeValue as t } from '../../../utils/global-constants.js';
import { applyBoolDifferences } from '../../geometry-operator/boolean-difference.js';

function mapClipping(shape, product) {
  const { clippingReps, bodyRep } = getClippingRepresentations(shape);
  const mainGeometry = getMappedGeometry(bodyRep, product);
  const clippingGeometries = createClippingVolumes(clippingReps);
  const booleanResult = applyBoolDifferences(mainGeometry, clippingGeometries);
  return generateResultMesh(booleanResult, mainGeometry, clippingGeometries);
}

function generateResultMesh(booleanResult, mainGeometry, clippingGeometries) {
  const result = CSG.toMesh(booleanResult, mainGeometry.matrix);
  result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
  result.material = new THREE.MeshPhongMaterial();
  mainObject.remove(mainGeometry);
  clippingGeometries.forEach((clippingGeo) => mainObject.remove(clippingGeo));
  return result;
}

function getClippingRepresentations(shape) {
  const clippingReps = [];
  let bodyRep = shape[n.items][0];
  while (bodyRep[n.ifcClass] == 'IfcBooleanClippingResult') {
    clippingReps.push(bodyRep[n.secondOperand]);
    bodyRep = bodyRep[n.firstOperand];
  }
  return { clippingReps, bodyRep };
}

function createClippingVolumes(clippingRepresentations) {
  const clippingGeometries = [];
  clippingRepresentations.forEach((clippingRep) =>
    clippingGeometries.push(createClippingVolume(clippingRep))
  );
  return clippingGeometries;
}

function createClippingVolume(clippingRep) {
  if (clippingRep[n.ifcClass].toUpperCase() === ifcTypes.IfcHalfSpaceSolid)
    return mapIfcHalfSpaceSolid(clippingRep);
  return mapIfcPolygonalBoundedHalfSpace(clippingRep);
}

function mapIfcHalfSpaceSolid(clippingRep) {
  let orientation = clippingRep[n.agreementFlag];
  if (typeof orientation != 'boolean') orientation = orientation.value;
  const clippingGeom = createClippingBox(orientation);
  const position = clippingRep[n.baseSurface][n.position];
  applyTransformsToGeometry(clippingGeom, position);
  return clippingGeom;
}

function mapIfcPolygonalBoundedHalfSpace(clippingRep) {
  const clippingGeom = mapIfcHalfSpaceSolid(clippingRep);
  const boundingGeom = getBoundingGeometry(clippingRep);
  const result = applyBoundingToGeometry(clippingGeom, boundingGeom);
  result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
  result.material = new THREE.MeshPhongMaterial();
  mainObject.remove(clippingGeom);
  mainObject.remove(boundingGeom);
  result.add(clippingGeom);
  return result;
}

function applyBoundingToGeometry(clippingGeom, boundingGeom) {
  let bspA = CSG.fromMesh(clippingGeom);
  let bspB = CSG.fromMesh(boundingGeom);
  let geomResult = bspA.intersect(bspB);
  return CSG.toMesh(geomResult, clippingGeom.matrix);
}

function getBoundingGeometry(clippingRep) {
  const points = getBoundingPoints(clippingRep);
  const boundingGeom = createExtrusionsByPoints(points, 1000000);
  const boundPosition = clippingRep[n.position];
  applyTransformsToGeometry(boundingGeom, boundPosition);
  boundingGeom.position.z -= 500000;
  boundingGeom.updateMatrix();
  return boundingGeom;
}

function getBoundingPoints(clippingRep) {
  return clippingRep[n.polygonalBoundary][n.points].map((point) => {
    const coords = point[n.coordinates];
    return [-coords[0], -coords[1]];
  });
}

export { mapClipping };
