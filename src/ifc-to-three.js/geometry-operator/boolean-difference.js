import CSG from '../../../libs/CSGMesh.js';

function applyBoolDifferences(baseMesh, subtractedMeshes) {
  baseMesh.updateMatrix();
  let operand1 = CSG.fromMesh(baseMesh);
  for (let i = 0; i < subtractedMeshes.length; i++) {
    const clippingMesh = subtractedMeshes[i];
    clippingMesh.updateMatrix();
    const operand2 = CSG.fromMesh(clippingMesh);
    operand1 = (operand2.polygons.length > 0) ? operand1.subtract(operand2) : operand1;
  }
  return operand1;
}

export { applyBoolDifferences };
