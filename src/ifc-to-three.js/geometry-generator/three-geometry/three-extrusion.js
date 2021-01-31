import { namedProps as n } from '../../../utils/global-constants.js';

function createExtrusionsByPoints(points, depth, dir = [0, 0, 1], holes, position) {
  const shapePoints = [];
  points.forEach((e) => shapePoints.push(new THREE.Vector3(e[1], -e[0])));
  const shape = new THREE.Shape(shapePoints);
  if (holes) holes.forEach((hole) => shape.holes.push(hole));
  dir = correctExtrusionOrientation(dir, position);
  return createExtrusion(shape, depth, dir);
}

function createCircularExtrusion(radius, depth, dir = [0, 0, 1], thickness) {
  const segments = 36;
  const outerShape = createCircularShape(radius, segments);
  if (thickness) {
    const innerShape = createCircularShape(radius - thickness, segments);
    outerShape.holes.push(innerShape);
  }
  return createExtrusion(outerShape, depth, (dir = [0, 0, 1]));
}

function createTubularExtrusion(radius, depth, dir = [0, 0, 1], thickness) {
  return createCircularExtrusion(radius, depth, dir, thickness);
}

function createCircularShape(radius, segments) {
  const coordinates = getCircleCoordinates(radius, segments);
  const shape = new THREE.Shape();
  shape.moveTo(...coordinates[0]);
  coordinates.shift;
  coordinates.forEach((point) => shape.lineTo(...point));
  return shape;
}

function getCircleCoordinates(radius, steps) {
  const coords = [];
  for (let i = 0; i < steps; i++) {
    coords.push([
      radius * Math.cos(2 * Math.PI * (i / steps)),
      radius * Math.sin(2 * Math.PI * (i / steps))
    ]);
  }
  coords.push([...coords[0]]);
  return coords;
}

function createIShapeExtrusion(profile, depth, dir = [0, 0, 1]) {
  const overallWidth = profile[n.overallWidth];
  const overallDepth = profile[n.overallDepth];
  const webThickness = profile[n.webThickness];
  const flangeThickness = profile[n.flangeThickness];
  const filletRadius = profile[n.filletRadius];
  const shape = new THREE.Shape();
  const halfWidth = overallWidth / 2;
  const halfDepth = overallDepth / 2;
  const halfWebThickness = webThickness / 2;
  shape.moveTo(halfWidth, halfDepth);
  shape.lineTo(-halfWidth, halfDepth);
  shape.lineTo(-halfWidth, halfDepth - flangeThickness);
  shape.lineTo(-halfWebThickness - filletRadius, halfDepth - flangeThickness);
  shape.lineTo(-halfWebThickness - filletRadius, halfDepth - flangeThickness);
  shape.arc(0, -filletRadius, filletRadius, Math.PI / 2, 0, true);
  shape.lineTo(-halfWebThickness, -halfDepth + flangeThickness + filletRadius);
  shape.arc(-filletRadius, 0, filletRadius, 0, (3 * Math.PI) / 2, true);
  shape.lineTo(-halfWidth, -halfDepth + flangeThickness);
  shape.lineTo(-halfWidth, -halfDepth);
  shape.lineTo(halfWidth, -halfDepth);
  shape.lineTo(halfWidth, -halfDepth + flangeThickness);
  shape.lineTo(halfWebThickness + filletRadius, -halfDepth + flangeThickness);
  shape.lineTo(halfWebThickness + filletRadius, -halfDepth + flangeThickness);
  shape.arc(0, filletRadius, filletRadius, (3 * Math.PI) / 2, Math.PI, true);
  shape.lineTo(halfWebThickness, halfDepth - flangeThickness - filletRadius);
  shape.arc(filletRadius, 0, filletRadius, Math.PI, Math.PI / 2, true);
  shape.lineTo(halfWidth, halfDepth - flangeThickness);
  const extrusion = createExtrusion(shape, depth, dir);
  extrusion.rotation.z += Math.PI / 2;
  extrusion.updateMatrix();
  return extrusion;
}

function createExtrusion(shape, depth, dir = [0, 0, 1]) {
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const extrudeSettings = getExtrudeSettings(depth, dir);
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  applyExtrusionDirection(dir, geometry);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.updateMatrix();
  return mesh;
}

function getExtrudeSettings(depth, dir) {
  const path = getVerticalDirection(depth, dir);
  return {
    bevelEnabled: false,
    steps: 1,
    extrudePath: path
  };
}

//To define the direction of the extrusion:
// x and y are applied as a skew operation (transform matrix)
// z is applied in the vertical direction

function applyExtrusionDirection(dir, geometry) {
  const matrix = getTransformMatrix(dir);
  geometry.applyMatrix4(matrix);
}

function getTransformMatrix(dir) {
  const matrix = new THREE.Matrix4();
  const direction = new THREE.Vector3(dir[0], dir[1], dir[2]);
  const Syx = 0;
  const Sxy = 0;
  const Sxz = 0;
  const Syz = 0;
  const Szx = -direction.x / direction.z;
  const Szy = direction.y / direction.z;
  return matrix.set(1, Syx, Szx, 0, Sxy, 1, Szy, 0, Sxz, Syz, 1, 0, 0, 0, 0, 1);
}

function getVerticalDirection(depth, dir) {
  const v1 = new THREE.Vector3(0, 0, 0);
  const v2 = new THREE.Vector3(0, 0, depth * dir[2]);
  return new THREE.LineCurve3(v1, v2);
}

//The extrusion direction needs to be applied when creating the extrusion (at the profile level)
//But in IFC, the coordinate system of the extrusion direction is at the level of IfcExtrudedAreaSolid
//Thus, the extrusion direction needs to be correted in order to comply with this coordinate system
function correctExtrusionOrientation(direction, position) {
  if (position) {
    const directionVector = position[n.refDirection][n.dirRatios];
    const angle = Math.atan2(directionVector[1], directionVector[0]);
    return [
      direction[0] * Math.cos(angle) - direction[1] * Math.sin(angle),
      direction[0] * Math.sin(angle) + direction[1] * Math.cos(angle),
      direction[2]
    ];
  }
  return direction;
}

export {
  createExtrusionsByPoints,
  createCircularExtrusion,
  createTubularExtrusion,
  createIShapeExtrusion,
  createExtrusion
};
