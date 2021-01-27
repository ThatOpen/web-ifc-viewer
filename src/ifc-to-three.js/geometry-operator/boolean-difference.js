import CSG from '../../../libs/CSGMesh.js';

function applyBoolDifferences(baseMesh, clipMeshes) {
  preventCoplanarSurfaces(baseMesh);
  let operand1 = CSG.fromMesh(baseMesh);
  for (let i = 0; i < clipMeshes.length; i++) {
    const clipMesh = clipMeshes[i];
    clipMesh.updateMatrix();
    const operand2 = CSG.fromMesh(clipMesh);
    operand1 = (operand2.polygons.length > 0) ? subtractVolume(operand1, operand2, baseMesh, clipMesh) : operand1;
  }
  return operand1;
}

//Ugly, but avoids crashes of CSG operations due to face superpositions
function preventCoplanarSurfaces(baseMesh) {
  const factor = 0.99999;
  baseMesh.scale.x *= factor;
  baseMesh.scale.y *= factor;
  baseMesh.scale.z *= factor;
  baseMesh.updateMatrix();
}

//Sometimes (uncommon) the CSG library fails and swaps the functionality of subtract and intersects
//This rectifies the result if it is an intersection instead of a subtraction
function subtractVolume(operand1, operand2, baseMesh, clippingMesh) {
  const result = operand1.subtract(operand2);
  const resultMesh = CSG.toMesh(result, baseMesh.matrix);
  const boundingBox1 = new THREE.Box3().setFromObject(resultMesh);
  const boundingBox2 = new THREE.Box3().setFromObject(clippingMesh);
  if (areBoundingBoxesEqual(boundingBox1, boundingBox2)) return operand1.intersect(operand2);
  return result;
}

function areBoundingBoxesEqual(boundingBox1, boundingBox2) {
  return (
    isPointEqual(boundingBox1.max, boundingBox2.max, 2) &&
    isPointEqual(boundingBox1.min, boundingBox2.min, 2)
  );
}

function isPointEqual(point1, point2, precission) {
  return (
    point1.x.toFixed(precission) == point2.x.toFixed(precission) &&
    point1.y.toFixed(precission) == point2.y.toFixed(precission) &&
    point1.z.toFixed(precission) == point2.z.toFixed(precission)
  );
}

export { applyBoolDifferences };
