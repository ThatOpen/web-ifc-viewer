//https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103

function createBufferGeometry(faces) {
  const { triangles, normals, uvs } = triangulate(faces);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', getAttribute(triangles, 3));
  geometry.setAttribute('normal', getAttribute(normals, 3));
  geometry.setAttribute('uv', getAttribute(uvs, 2));
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry);
}

function getAttribute(attribute, attributeCount) {
  return new THREE.BufferAttribute(new Float32Array(attribute), attributeCount);
}

function triangulate(faces) {
  const triangles = [];
  const normals = [];
  const uvs = [];
  faces.forEach((face) => {
    const outerFace = face.outerBounds.bounds[0];
    const innerBounds = face.innerBounds.bounds;

    const outerPoints = getPoints(outerFace);
    const innerBoundsPoints = [];
    innerBounds.forEach((bound) => innerBoundsPoints.push(getPoints(bound)));
    const allPoints = [];
    allPoints.push(...outerPoints);
    innerBoundsPoints.forEach(boundPoints => allPoints.push(...boundPoints));

    const flatCoords = getFlatCoordinates(allPoints);

    const indices = getTriangleIndices(outerPoints.length, innerBoundsPoints, allPoints);

    for (const index of indices) {
      let triangle = getTriangle(flatCoords, index);
      triangles.push(...triangle);
      normals.push(...[0, 0, 0]);
      uvs.push(...[0, 0]);
    }
  });
  return { triangles, normals, uvs };
}

function getFlatCoordinates(face) {
  let flatCoords = [];
  face.forEach((coord) => flatCoords.push(...[coord.x, coord.y, coord.z]));
  return flatCoords;
}

function getTriangleIndices(outPointsCount, innerBoundsPoints, allPoints) {
  const { tempCoords, holeIndices } = getTempCoordinates(outPointsCount, innerBoundsPoints, allPoints);
  return earcut(tempCoords, holeIndices);
}

function getTempCoordinates(outPointsCount, innerBoundsPoints, allPoints) {
  const tempPoints = [];
  const tempCoords = [];
  const q = getQuaternion(allPoints);
  allPoints.forEach((p) => tempPoints.push(p.clone().applyQuaternion(q)));
  let baseIndex = outPointsCount;
  let holeIndices = [];
  innerBoundsPoints.forEach((boundPoints) => {
    holeIndices.push(baseIndex);
    baseIndex += boundPoints.length;
  });

  tempPoints.forEach((coord) => tempCoords.push(...[coord.x, coord.y]));
  return { tempCoords, holeIndices };
}


function getQuaternion(points) {
  const normal = getNormal(points);
  const baseNormal = new THREE.Vector3(0, 0, 1);
  return new THREE.Quaternion().setFromUnitVectors(normal, baseNormal);
}

function getNormal(points) {
  const length = points.length;
  const tri = new THREE.Triangle(
    points[0],
    points[Math.ceil(length / 3)],
    points[Math.ceil((2 * length) / 3)]
  );
  const normal = new THREE.Vector3();
  tri.getNormal(normal);
  return normal;
}

function getPoints(coordinates) {
  const points = [];
  coordinates.forEach((c) => {
    points.push(new THREE.Vector3(c[0], c[1], c[2]));
  });
  return points;
}

function getTriangle(face, index) {
  const triangleIndex = index * 3;
  const triangle = [face[triangleIndex], face[triangleIndex + 1], face[triangleIndex + 2]];
  return triangle;
}

export { createBufferGeometry };
