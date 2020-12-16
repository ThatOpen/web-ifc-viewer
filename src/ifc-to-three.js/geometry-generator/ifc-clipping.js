import { geometryTypes as g, namedProps as n } from '../../utils/global-constants.js';
import { applyTransformsTo } from '../geometry-transformer/local-transform-applier.js';
import { trackLocalTransform } from '../geometry-transformer/local-transform-tracker.js';
import { getMappedGeometry } from './geometry-map.js';
import { createClippingBox } from "./three-clipping.js";
import { mainObject } from "../scene/mainObject.js";
import CSG from "../../../libs/CSGMesh.js";

function mapClipping(shape, product) {
  const clippingReps = [];
  let representation = shape[n.items][0];

  while (representation[n.firstOperand][n.ifcClass] == "IfcBooleanClippingResult") {
    clippingReps.push(representation[n.secondOperand]);
    representation = representation[n.firstOperand];
  }

  clippingReps.push(representation[n.secondOperand]);
  const mainBody = representation[n.firstOperand];
  const mainBodyGeo = getMappedGeometry({[n.representationType]: [g.sweptSolid], [n.items]: [mainBody]}, product);

  const clippingGeos = [];
  clippingReps.forEach((clippingRep) => clippingGeos.push(createClippingBox(clippingRep)));

  // Position geometries in space:
  for (let i = 0; i < clippingGeos.length; i++) {
    const position = clippingGeo[n.position];
    trackLocalTransform(product, position, n.transformOfExtrusion);
    applyTransformsTo(product, clippingGeo, n.transformOfExtrusion);
  }

  // Apply boolean operations usng CSGMesh
  // Delete all geometry except for the final result
  mainBodyGeo.geometry.computeFaceNormals();
  mainBodyGeo.updateMatrix();
  let bspA = CSG.fromMesh(mainBodyGeo);

  for (let i = 0; i < clippingGeos.length; i++) {
    const clippingGeo = clippingGeos[i];
    clippingGeo.updateMatrix();
    let bspB = CSG.fromMesh(clippingGeo);
    bspA = bspA.subtract(bspB);
  }

  const result = CSG.toMesh(bspA, mainBodyGeo.matrix);
  result.geometry = new THREE.BufferGeometry().fromGeometry(
    result.geometry
  );

  result.material = new THREE.MeshPhongMaterial();

  mainObject.remove(mainBodyGeo);

  return result;
}

export { mapClipping };
