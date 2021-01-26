import { namedProps as n } from '../../../utils/global-constants.js';
import { getName, ifcTypes as t } from '../../../utils/ifc-types.js';
import { createFace } from '../three-geometry/three-brep.js';

function mapBrep(shape) {
  const representations = shape[n.items];
  const definitions = [];
  representations.forEach((r) => definitions.push(...getGeometry(r[n.outer][n.cfsFaces])));

  return createAndJoinFaces(definitions);
}

function mapSurfaceModel(shape) {
  const faceSets = shape[n.items][0][n.fbsmFaces];
  const definitions = [];
  faceSets.forEach((faceSet) => definitions.push(...getGeometry(faceSet[n.cfsFaces])));

  return createAndJoinFaces(definitions);
}

function createAndJoinFaces(definitions) {
  const faces = [];
  definitions.forEach((definition) => faces.push(createFace(definition)));
  return joinAllFaces(faces);
}

function joinAllFaces(faces) {
  const joined = new THREE.Geometry();
  faces.forEach((face) => joined.merge(face.geometry, face.matrix));
  const material = new THREE.MeshPhongMaterial({ side: 2 });
  const mesh = new THREE.Mesh(joined, material);
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  mesh[n.isBrep] = true;
  return mesh;
}

function getGeometry(faceSet) {
  const faces = [];
  faceSet.forEach((face) => faces.push(getAllBounds(face)));
  return faces;
}

function getAllBounds(face) {
  const outerBoundsInfo = filterBounds(face, t.IfcFaceOuterBound);
  const innerBoundsInfo = filterBounds(face, t.IfcFaceBound);
  const outerBounds = getBounds(outerBoundsInfo);
  const innerBounds = innerBoundsInfo ? getBounds(innerBoundsInfo) : {};
  return { outerBounds, innerBounds };
}

function getBounds(ifcBounds) {
  const bounds = [];
  const orientation = [];
  ifcBounds.forEach((bound) => {
    bounds.push(getPoints(bound));
    orientation.push(bound[n.orientation]);
  });
  return { orientation, bounds };
}

function getPoints(bound) {
  const points = bound[n.bound][n.polygon];
  const coordinates = [];
  points.forEach((point) => {
    const coord = point[n.coordinates];
    if (coord) coordinates.push(coord);
  });
  return coordinates;
}

function filterBounds(face, type) {
  return face[n.bounds].filter((e) => e[n.ifcClass] === getName(type));
}

export { mapBrep, mapSurfaceModel };
