import { createPoint } from "./three-points.js";

function createFace(faceDefinition) {
  //Credit to the following algorithm:
  //https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103

  const outerCoords = faceDefinition.outerBounds.bounds[0];
  const outerPoints = getPoints(outerCoords);
  const quaternion = getQuaternions(outerPoints);
  const tempOuterPoints = getTempPoints(outerPoints, quaternion);
  const outerShape = new THREE.Shape(tempOuterPoints);
  const allPoints = [...outerPoints];

  if (hasHoles(faceDefinition))
    punchHoles(faceDefinition, quaternion, allPoints, outerShape);

  const shapeGeom = new THREE.ShapeGeometry(outerShape, 24);
  const mesh = new THREE.Mesh(shapeGeom);

  mesh.geometry.vertices = allPoints;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  return mesh;
}

function getPoints(coordinates) {
  return coordinates.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
}

function getTempPoints(points, quaternion) {
  return points.map((p) => p.clone().applyQuaternion(quaternion));
}

function hasHoles(faceDefinition) {
  return faceDefinition.innerBounds.bounds.length > 0;
}

function punchHoles(faceDefinition, quaternion, allPoints, outerShape) {
  faceDefinition.innerBounds.bounds.forEach((bound) => {
    const innerPoints = getPoints(bound);
    const tempInnerPoints = getTempPoints(innerPoints, quaternion);
    const innerShape = new THREE.Path(tempInnerPoints);
    outerShape.holes.push(innerShape);
    allPoints.push(...innerPoints);
  });
}

//To find the normal of the face it is necessary to iterate through the vertices
//To make sure that the selected triangle of vertex is valid
//That is, it doesn't have all vertices aligned in same dimension
function getQuaternions(points) {
  const baseNormal = new THREE.Vector3(0, 0, 1);
  const normal = new THREE.Vector3();
  let i = 0;

  while (normal.x === 0 && normal.y === 0 && normal.z === 0) {
    const tri = new THREE.Triangle(points[2 + i], points[1 + i], points[0 + i]);
    tri.getNormal(normal);
    i++;
  }

  return new THREE.Quaternion().setFromUnitVectors(normal, baseNormal);
}

export { createFace };
