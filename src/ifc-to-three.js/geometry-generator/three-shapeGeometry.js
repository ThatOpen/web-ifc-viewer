import { createPoint } from "./three-points.js";

function createFace(faceDefinition) {
  //Credit to the following algorithm:
  //https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103

  const outerCoords = faceDefinition.outerBounds.bounds[0];
  let outerPoints = getPoints(outerCoords);

  let { tempOuterPoints, quaternion } = getProjectedPointsAndQuaternion(outerPoints);

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
    let innerPoints = getPoints(bound);
    let tempInnerPoints = getTempPoints(innerPoints, quaternion);
    const innerShape = new THREE.Path(tempInnerPoints);
    outerShape.holes.push(innerShape);
    allPoints.push(...innerPoints);
  });
}

//To find the normal of the face it is necessary to ensure that:
// 1. the selected triangle of vertices is valid (they are not aligned)
// 2. the area of the selected triangle is big enough to increment the precission of the vector
// 3. the generated 2d surface has its points defined clockwise
function getProjectedPointsAndQuaternion(points) {
  const baseNormal = new THREE.Vector3(0, 0, 1);
  const normal = new THREE.Vector3();
  const triangles = [];
  let index1 = 1,
    index2 = 2;
  while (index2 < points.length) {
    const triangle = new THREE.Triangle(
      points[index2],
      points[index1],
      points[0]
    );
    const temp = new THREE.Vector3();
    triangle.getNormal(temp);
    //1.
    if (temp.x != 0 || temp.y != 0 || temp.z != 0) {
      triangles.push({ area: triangle.getArea(), triangle });
    }
    index1++;
    index2++;
  }

  //2.
  triangles
    .sort((a, b) => (a.area > b.area ? 1 : b.area > a.area ? -1 : 0))
    .reverse();

  //3.
  let selectedTriangle = 0;
  let tempOuterPoints = [];
  let quaternion = {};
  let isClockWise = false;
  while (isClockWise === false) {
    const tri = triangles[selectedTriangle];
    tri.triangle.getNormal(normal);
    quaternion = new THREE.Quaternion().setFromUnitVectors(normal, baseNormal);

    tempOuterPoints = getTempPoints(points, quaternion);
    const t = tempOuterPoints.map((p) => new THREE.Vector2(p.x, p.y));
    isClockWise = THREE.ShapeUtils.isClockWise(t);
    selectedTriangle++;
  }
  return { tempOuterPoints, quaternion };
}

export { createFace };
