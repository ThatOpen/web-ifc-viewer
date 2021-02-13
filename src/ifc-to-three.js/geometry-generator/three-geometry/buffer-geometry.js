//https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103

function createBufferGeometry(faces) {
  const result = triangulate(faces);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', getAttribute(result.triangles, 3));
  geometry.setAttribute('normal', getAttribute(result.normals, 3));
  geometry.setAttribute('uv', getAttribute(result.uvs, 2));
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry);
}

function getAttribute(attribute, attributeCount) {
  return new THREE.BufferAttribute(new Float32Array(attribute), attributeCount);
}

function triangulate(faces) {
  const result = { triangles: [], normals: [], uvs: [] };
  faces.forEach((face) => triangulateFace(face, result));
  return result;
}

function triangulateFace(face, result) {
  const points = getAllPoints(face);
  const flatCoords = getFlatCoordinates(points.all);
  const indices = getTriangleIndices(points);
  for (const index of indices) {
    result.triangles.push(...getTriangle(flatCoords, index));
    result.normals.push(...[0, 0, 0]);
    result.uvs.push(...[0, 0]);
  }
}

function getAllPoints(face) {
  const points = { outer: [], inner: [], all: [] };
  const outerFace = face.outerBounds.bounds[0];
  const innerBounds = face.innerBounds.bounds;
  points.outer = getThreePoints(outerFace);
  innerBounds.forEach((bound) => points.inner.push(getThreePoints(bound)));
  points.all.push(...points.outer);
  points.inner.forEach((boundPoints) => points.all.push(...boundPoints));
  return points;
}

function getFlatCoordinates(face) {
  let flatCoords = [];
  face.forEach((coord) => flatCoords.push(...[coord.x, coord.y, coord.z]));
  return flatCoords;
}

function getTriangleIndices(points) {
  const tempCoords = getTempCoordinates(points);
  const holeIndices = getHolesIndices(points);
  return earcut(tempCoords, holeIndices);
}

function getTempCoordinates(points) {
  const tempPoints = [];
  const tempCoords = [];
  const q = getQuaternion(points.all);
  points.all.forEach((p) => tempPoints.push(p.clone().applyQuaternion(q)));
  tempPoints.forEach((coord) => tempCoords.push(...[coord.x, coord.y]));
  return  tempCoords;
}

function getHolesIndices(points){
  let baseIndex = points.outer.length;
  let holeIndices = [];
  points.inner.forEach((boundPoints) => {
    holeIndices.push(baseIndex);
    baseIndex += boundPoints.length;
  });
  return holeIndices;
}

function getQuaternion(points) {
  const normal = getNormal(points);
  const baseNormal = new THREE.Vector3(0, 0, 1);
  return new THREE.Quaternion().setFromUnitVectors(normal, baseNormal);
}

function getNormal(points) {
  const length = points.length;
  const p1 = points[0];
  const p2 = points[Math.ceil(length / 3)];
  const p3 = points[Math.ceil((2 * length) / 3)];
  const tri = new THREE.Triangle(p1, p2, p3);
  const normal = new THREE.Vector3();
  tri.getNormal(normal);
  return normal;
}

function getThreePoints(coordinates) {
  const points = [];
  coordinates.forEach((c) => points.push(new THREE.Vector3(c[0], c[1], c[2])));
  return points;
}

function getTriangle(face, index) {
  const triangleIndex = index * 3;
  const triangle = [face[triangleIndex], face[triangleIndex + 1], face[triangleIndex + 2]];
  return triangle;
}

export { createBufferGeometry };
