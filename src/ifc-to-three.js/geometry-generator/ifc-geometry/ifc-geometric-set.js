import { namedProps as n } from '../../../utils/global-constants.js';
import { mapCurve } from '../curves/curves-map.js';

function mapGeometricSet(shape) {
  const curves = shape[n.items][0][n.elements];
  const result = new THREE.Object3D();
  const mappedCurves = curves.map((e) => mapCurve(e));
  mappedCurves.forEach((curve) => result.add(curve));
  return result;
}

export { mapGeometricSet };
