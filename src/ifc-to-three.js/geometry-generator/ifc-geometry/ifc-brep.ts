import { namedProps as n } from '../../../utils/global-constants.js';
import { getName, ifcTypes as t } from '../../../utils/ifc-types.js';
import { createFace } from '../three-geometry/three-brep.js';

function mapBrep(shape: any) {
  const representations = shape[n.items];
  const definitions: any = [];
  representations.forEach((r: any) => definitions.push(...getGeometry(r[n.outer][n.cfsFaces])));

  return createAndJoinFaces(definitions);
}

function mapSurfaceModel(shape: any) {
  const faceSets = shape[n.items][0][n.fbsmFaces];
  const definitions: any = [];
  faceSets.forEach((faceSet: any) => definitions.push(...getGeometry(faceSet[n.cfsFaces])));

  return createAndJoinFaces(definitions);
}

function createAndJoinFaces(definitions: any) {
  const faces: any = [];
  definitions.forEach((definition: any) => faces.push(createFace(definition)));
  return joinAllFaces(faces);
}

function joinAllFaces(faces: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const joined = new THREE.Geometry();
  faces.forEach((face: any) => joined.merge(face.geometry, face.matrix));
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const material = new THREE.MeshPhongMaterial({ side: 2 });
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const mesh = new THREE.Mesh(joined, material);
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  mesh[n.isBrep] = true;
  return mesh;
}

function getGeometry(faceSet: any) {
  const faces: any = [];
  faceSet.forEach((face: any) => faces.push(getAllBounds(face)));
  return faces;
}

function getAllBounds(face: any) {
  const outerBoundsInfo = filterBounds(face, t.IfcFaceOuterBound);
  const innerBoundsInfo = filterBounds(face, t.IfcFaceBound);
  const outerBounds = getBounds(outerBoundsInfo);
  const innerBounds = innerBoundsInfo ? getBounds(innerBoundsInfo) : {};
  return { outerBounds, innerBounds };
}

function getBounds(ifcBounds: any) {
  const bounds: any = [];
  const orientation: any = [];
  ifcBounds.forEach((bound: any) => {
    bounds.push(getPoints(bound));
    orientation.push(bound[n.orientation]);
  });
  return { orientation, bounds };
}

function getPoints(bound: any) {
  const points = bound[n.bound][n.polygon];
  const coordinates: any = [];
  points.forEach((point: any) => {
    const coord = point[n.coordinates];
    if (coord) coordinates.push(coord);
  });
  return coordinates;
}

function filterBounds(face: any, type: any) {
  return face[n.bounds].filter((e: any) => e[n.ifcClass] === getName(type));
}

export { mapBrep, mapSurfaceModel };
