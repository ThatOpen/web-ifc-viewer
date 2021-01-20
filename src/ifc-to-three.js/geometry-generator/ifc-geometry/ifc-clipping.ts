import { applyTransformsToGeometry } from '../../geometry-transformer/local-transform-applier.js';
import { getMappedGeometry } from '../geometry-map.js';
import { createClippingBox } from '../three-geometry/three-clipping.js';
import { mainObject } from '../../scene/mainObject.js';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '../.... Remove this comment to see the full error message
import CSG from '../../../../libs/CSGMesh.js';
import { createExtrusionsByPoints } from '../three-geometry/three-extrusion.js';
import { ifcTypes } from '../../../utils/ifc-types.js';
import { namedProps as n, typeValue as t } from '../../../utils/global-constants.js';
import { applyBoolDifferences } from '../../geometry-operator/boolean-difference.js';

// @ts-expect-error ts-migrate(7023) FIXME: 'mapClipping' implicitly has return type 'any' bec... Remove this comment to see the full error message
function mapClipping(shape: any, product: any) {
  const { clippingReps, bodyRep } = getClippingRepresentations(shape);
  // @ts-expect-error ts-migrate(7022) FIXME: 'mainGeometry' implicitly has type 'any' because i... Remove this comment to see the full error message
  const mainGeometry = getMappedGeometry(bodyRep, product);
  const clippingGeometries = createClippingVolumes(clippingReps);
  const booleanResult = applyBoolDifferences(mainGeometry, clippingGeometries);
  return generateResultMesh(booleanResult, mainGeometry, clippingGeometries);
}

function generateResultMesh(booleanResult: any, mainGeometry: any, clippingGeometries: any) {
  const result = CSG.toMesh(booleanResult, mainGeometry.matrix);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  result.material = new THREE.MeshPhongMaterial();
  mainObject.remove(mainGeometry);
  clippingGeometries.forEach((clippingGeo: any) => mainObject.remove(clippingGeo));
  return result;
}

function getClippingRepresentations(shape: any) {
  const clippingReps = [];
  let bodyRep = shape[n.items][0];
  while (bodyRep[n.ifcClass] == 'IfcBooleanClippingResult') {
    clippingReps.push(bodyRep[n.secondOperand]);
    bodyRep = bodyRep[n.firstOperand];
  }
  return { clippingReps, bodyRep };
}

function createClippingVolumes(clippingRepresentations: any) {
  const clippingGeometries: any = [];
  clippingRepresentations.forEach((clippingRep: any) => clippingGeometries.push(createClippingVolume(clippingRep))
  );
  return clippingGeometries;
}

function createClippingVolume(clippingRep: any) {
  if (clippingRep[n.ifcClass].toUpperCase() === ifcTypes.IfcHalfSpaceSolid)
    return mapIfcHalfSpaceSolid(clippingRep);
  return mapIfcPolygonalBoundedHalfSpace(clippingRep);
}

function mapIfcHalfSpaceSolid(clippingRep: any) {
  let orientation = clippingRep[n.agreementFlag];
  if (typeof orientation != 'boolean') orientation = orientation.value;
  const clippingGeom = createClippingBox(orientation);
  const position = clippingRep[n.baseSurface][n.position];
  applyTransformsToGeometry(clippingGeom, position);
  return clippingGeom;
}

function mapIfcPolygonalBoundedHalfSpace(clippingRep: any) {
  const clippingGeom = mapIfcHalfSpaceSolid(clippingRep);
  const boundingGeom = getBoundingGeometry(clippingRep);
  const result = applyBoundingToGeometry(clippingGeom, boundingGeom);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  result.material = new THREE.MeshPhongMaterial();
  mainObject.remove(clippingGeom);
  mainObject.remove(boundingGeom);
  result.add(clippingGeom);
  return result;
}

function applyBoundingToGeometry(clippingGeom: any, boundingGeom: any) {
  let bspA = CSG.fromMesh(clippingGeom);
  let bspB = CSG.fromMesh(boundingGeom);
  let geomResult = bspA.intersect(bspB);
  return CSG.toMesh(geomResult, clippingGeom.matrix);
}

function getBoundingGeometry(clippingRep: any) {
  const points = getBoundingPoints(clippingRep);
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
  const boundingGeom = createExtrusionsByPoints(points, 1000000);
  const boundPosition = clippingRep[n.position];
  applyTransformsToGeometry(boundingGeom, boundPosition);
  boundingGeom.position.z -= 500000;
  boundingGeom.updateMatrix();
  return boundingGeom;
}

function getBoundingPoints(clippingRep: any) {
  return clippingRep[n.polygonalBoundary][n.points].map((point: any) => {
    const coords = point[n.coordinates];
    return [-coords[0], -coords[1]];
  });
}

export { mapClipping };
