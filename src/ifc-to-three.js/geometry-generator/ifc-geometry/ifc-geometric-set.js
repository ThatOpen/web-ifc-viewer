import { namedProps as n } from "../../../utils/global-constants.js";
import { mapCurve } from "../curves/curve.js";

function mapGeometricSet(shape) {
  const curves = shape[n.items][0][n.elements];
  const result = new THREE.Object3D();
  result.children = [...curves.map((e) => mapCurve(e))];
  return result;
}

export { mapGeometricSet };
