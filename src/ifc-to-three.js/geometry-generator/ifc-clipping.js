import { applyTransformsTo } from '../geometry-transformer/local-transform-applier.js';
import { trackLocalTransform } from '../geometry-transformer/local-transform-tracker.js';
import { getMappedGeometry } from './geometry-map.js';
import { createClippingBox } from './three-clipping.js';
import { mainObject } from '../scene/mainObject.js';
import CSG from '../../../libs/CSGMesh.js';
import { createExtrusionsByPoints } from './three-extrusion.js';
import { ifcTypes } from '../../utils/ifc-types.js';
import {
  geometryTypes as g,
  namedProps as n,
  typeValue as t
} from '../../utils/global-constants.js';
import { applyBoolDifferences } from '../geometry-operator/boolean-difference.js';

function mapClipping(shape, product) {
  const { clippingReps, bodyRep } = getClippingRepresentations(shape);
  const mainGeometry = getMappedGeometry(bodyRep, product);
  const clippingGeometries = createClippingPlanes(clippingReps, product);
  const booleanResult = applyBoolDifferences(mainGeometry, clippingGeometries);
  return generateResultMesh(booleanResult, mainGeometry,clippingGeometries);
}

function generateResultMesh(booleanResult, mainGeometry, clippingGeometries){
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

function createClippingPlanes(clippingRepresentations, product){
  const clippingGeometries = [];
  clippingRepresentations.forEach((clippingRep) =>
    clippingGeometries.push(createClippingPlane(clippingRep, product))
  );
  return clippingGeometries;
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
  const clippingGeom = getClippingGeometry(clippingRep, product);
  const boundingGeom = getBoundingGeometry(clippingRep, product);
  const result = applyBoundingToGeometry(clippingGeom, boundingGeom);
  result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
  result.material = new THREE.MeshPhongMaterial();
  mainObject.remove(clippingGeom);
  mainObject.remove(boundingGeom);
  return result;
}

function applyBoundingToGeometry(clippingGeom, boundingGeom){
  let bspA = CSG.fromMesh(clippingGeom);
  let bspB = CSG.fromMesh(boundingGeom);
  let geomResult = bspA.intersect(bspB);
  return CSG.toMesh(geomResult, clippingGeom.matrix);
}

function getClippingGeometry(clippingRep, product){
  let orientation = clippingRep[n.agreementFlag];
  if (typeof orientation != 'boolean') orientation = orientation.value;
  const clippingGeom = createClippingBox(orientation);
  const position = clippingRep[n.baseSurface][n.position];
  trackLocalTransform(product, position, n.transformOfClippingVolume);
  applyTransformsTo(product, clippingGeom, n.transformOfClippingVolume);
  clippingGeom.geometry.computeFaceNormals();
  clippingGeom.updateMatrix();
  return clippingGeom;
}

function getBoundingGeometry(clippingRep, product){
  const points =  getBoundingPoints(clippingRep);
  const boundingGeom = createExtrusionsByPoints(points, 1000);
  const boundPosition = clippingRep[n.position];
  trackLocalTransform(product, boundPosition, n.transformOfClippingVolumeBound);
  applyTransformsTo(product, boundingGeom, n.transformOfClippingVolumeBound);
  boundingGeom.position.z -= 500;
  boundingGeom.updateMatrix();
  return boundingGeom;
}

function getBoundingPoints(clippingRep){
  return clippingRep[n.polygonalBoundary][n.points].map((point) => {
    const coords = point[n.coordinates];
    return [-coords[0], -coords[1]];
  });
}

export { mapClipping };
