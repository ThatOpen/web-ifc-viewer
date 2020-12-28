//Credit to the following algorithm:
//https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103

function createFace(faceDefinition) {
  const coordinates = faceDefinition.outerBounds.bounds[0];
  let outerPoints = getPoints(coordinates);
  let { tempOuterPoints, quaternion } = getProjectedPointsAndQuaternion(outerPoints);
  const outerShape = new THREE.Shape(tempOuterPoints);
  const allPoints = [...outerPoints];
  if (hasHoles(faceDefinition)) punchHoles(faceDefinition, quaternion, allPoints, outerShape);
  return createGeometry(outerShape, allPoints);
}

function createGeometry(outerShape, allPoints) {
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

//To implement this algorithm successfully (see link above)
// the selected triangle of vertices needs to fulfill the following points to work:
// 1. It must be a valid triangle (its vertices are not aligned)
// 2. Its area should be as big as possible to increment the precission of its normal vector
// 3. The generated 2d surface has its points defined clockwise

function getProjectedPointsAndQuaternion(points) {
  const triangles = getAllTriangles(points); //1
  sortTrianglesByArea(triangles); //2
  return getQuatAndPoints(triangles, points); //3
}

function getAllTriangles(points) {
  const triangles = [];
  let i = 1;
  while (i + 1 < points.length) {
    const { vector, triangle } = getTriangleVector(points, i);
    if (isVectorValid(vector)) triangles.push({ area: triangle.getArea(), triangle });
    i++;
  }
  return triangles;
}

function getTriangleVector(points, i) {
  const triangle = new THREE.Triangle(points[i + 1], points[i], points[0]);
  const vector = new THREE.Vector3();
  triangle.getNormal(vector);
  return { vector, triangle };
}

function sortTrianglesByArea(triangles) {
  triangles.sort((a, b) => (a.area > b.area ? 1 : b.area > a.area ? -1 : 0)).reverse();
}

function isVectorValid(vector) {
  return vector.x != 0 || vector.y != 0 || vector.z != 0;
}

function getQuatAndPoints(triangles, points) {
  const props = initializeProperties();
  while (props.isClockWise === false) selectAnotherTriangle(props, points, triangles);
  return { tempOuterPoints: props.tempOuterPoints, quaternion: props.quaternion };
}

function selectAnotherTriangle(props, points, triangles) {
  const tri = triangles[props.selectedTriangle];
  tri.triangle.getNormal(props.normal);
  props.quaternion = new THREE.Quaternion().setFromUnitVectors(props.normal, props.baseNormal);
  props.tempOuterPoints = getTempPoints(points, props.quaternion);
  const projected = props.tempOuterPoints.map((point) => new THREE.Vector2(point.x, point.y));
  props.isClockWise = THREE.ShapeUtils.isClockWise(projected);
  props.selectedTriangle++;
}

function initializeProperties() {
  return {
    baseNormal: new THREE.Vector3(0, 0, 1),
    normal: new THREE.Vector3(),
    selectedTriangle: 0,
    tempOuterPoints: [],
    quaternion: {},
    isClockWise: false
  };
}

export { createFace };
