//Credit to the following algorithm:
//https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103

function createFace(faceDefinition: any) {
  const coordinates = faceDefinition.outerBounds.bounds[0];
  let outerPoints = getPoints(coordinates);
  let { tempOuterPoints, quaternion } = getProjectedPointsAndQuaternion(outerPoints);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const outerShape = new THREE.Shape(tempOuterPoints);
  const allPoints = [...outerPoints];
  if (hasHoles(faceDefinition)) punchHoles(faceDefinition, quaternion, allPoints, outerShape);
  return createGeometry(outerShape, allPoints);
}

function createGeometry(outerShape: any, allPoints: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const shapeGeom = new THREE.ShapeGeometry(outerShape, 24);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const mesh = new THREE.Mesh(shapeGeom);
  mesh.geometry.vertices = allPoints;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  return mesh;
}

function getPoints(coordinates: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  return coordinates.map((p: any) => new THREE.Vector3(p[0], p[1], p[2]));
}

function getTempPoints(points: any, quaternion: any) {
  return points.map((p: any) => p.clone().applyQuaternion(quaternion));
}

function hasHoles(faceDefinition: any) {
  return faceDefinition.innerBounds.bounds.length > 0;
}

function punchHoles(faceDefinition: any, quaternion: any, allPoints: any, outerShape: any) {
  faceDefinition.innerBounds.bounds.forEach((bound: any) => {
    const innerPoints = getPoints(bound);
    const tempInnerPoints = getTempPoints(innerPoints, quaternion);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
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

function getProjectedPointsAndQuaternion(points: any) {
  const triangles = getAllTriangles(points); //1
  sortTrianglesByArea(triangles); //2
  return getQuatAndPoints(triangles, points); //3
}

function getAllTriangles(points: any) {
  const triangles = [];
  let i = 1;
  while (i + 1 < points.length) {
    const { vector, triangle } = getTriangleVector(points, i);
    if (isVectorValid(vector)) triangles.push({ area: triangle.getArea(), triangle });
    i++;
  }
  return triangles;
}

function getTriangleVector(points: any, i: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const triangle = new THREE.Triangle(points[i + 1], points[i], points[0]);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const vector = new THREE.Vector3();
  triangle.getNormal(vector);
  return { vector, triangle };
}

function sortTrianglesByArea(triangles: any) {
  triangles.sort((a: any, b: any) => (a.area > b.area ? 1 : b.area > a.area ? -1 : 0)).reverse();
}

function isVectorValid(vector: any) {
  return vector.x != 0 || vector.y != 0 || vector.z != 0;
}

function getQuatAndPoints(triangles: any, points: any) {
  const props = initializeProperties();
  while (props.isClockWise === false) selectAnotherTriangle(props, points, triangles);
  return { tempOuterPoints: props.tempOuterPoints, quaternion: props.quaternion };
}

function selectAnotherTriangle(props: any, points: any, triangles: any) {
  const tri = triangles[props.selectedTriangle];
  tri.triangle.getNormal(props.normal);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  props.quaternion = new THREE.Quaternion().setFromUnitVectors(props.normal, props.baseNormal);
  props.tempOuterPoints = getTempPoints(points, props.quaternion);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const projected = props.tempOuterPoints.map((point: any) => new THREE.Vector2(point.x, point.y));
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  props.isClockWise = THREE.ShapeUtils.isClockWise(projected);
  props.selectedTriangle++;
}

function initializeProperties() {
  return {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    baseNormal: new THREE.Vector3(0, 0, 1),
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    normal: new THREE.Vector3(),
    selectedTriangle: 0,
    tempOuterPoints: [],
    quaternion: {},
    isClockWise: false
  };
}

export { createFace };
