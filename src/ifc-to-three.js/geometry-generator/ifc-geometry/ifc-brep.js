import { namedProps as n } from '../../../utils/global-constants.js';
import { getName, ifcTypes as t } from '../../../utils/ifc-types.js';
import { createBufferGeometry } from '../three-geometry/buffer-geometry.js';

function mapBrep(shape) {
  const representations = shape[n.items];
  const definitions = [];
  representations.forEach((r) => definitions.push(...getGeometry(r[n.outer][n.cfsFaces])));
  console.time('buffer');
  const asdf = createBufferGeometry(definitions);
  console.timeEnd('buffer');
  return asdf;
}

function mapSurfaceModel(shape) {
  const faceSets = shape[n.items][0][n.fbsmFaces];
  const definitions = [];
  faceSets.forEach((faceSet) => definitions.push(...getGeometry(faceSet[n.cfsFaces])));
  return createBufferGeometry(definitions);
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
