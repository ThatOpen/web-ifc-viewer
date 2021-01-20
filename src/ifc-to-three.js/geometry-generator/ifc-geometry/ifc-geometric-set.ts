import { namedProps as n } from "../../../utils/global-constants.js";
import { mapCurve } from "../curves/curve.js";

function mapGeometricSet(shape: any) {
  const curves = shape[n.items][0][n.elements];
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const result = new THREE.Object3D();
  result.children = [...curves.map((e: any) => mapCurve(e))];
  return result;
}

export { mapGeometricSet };
