import { namedProps as n } from "../../utils/global-constants.js";
import { createFace } from "./three-shapeGeometry.js";

function mapBrep(shape, product) {
  const representations = shape[n.items];
  const definitions = [];
  const faces = [];
  representations.forEach((r) => definitions.push(...getBrepGeometry(r)));
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
  return mesh;
}

function getBrepGeometry(representation) {
  const faces = [];
  const ifcFaces = representation[n.outer][n.cfsFaces];
  ifcFaces.forEach((face) => faces.push(getBounds(face)));
  return faces;
}

function getBounds(face) {
  const ifcBounds = face[n.bounds];
  const points = [];
  const directions = [];
  ifcBounds.forEach((bound) => {
    points.push(...getPoints(bound));
    directions.push(bound[n.orientation]);
  });
  return {
    orientation: directions,
    coordinates: points,
  };
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

export { mapBrep };
