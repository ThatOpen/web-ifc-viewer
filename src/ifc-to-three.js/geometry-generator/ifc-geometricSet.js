import { namedProps as n } from "../../utils/global-constants.js";
import { mapIfcGeometricPrimitive } from "./ifc-geometricPrimitives.js";

function mapGeometricSet(shape) {
  const curves = shape[n.items][0][n.elements];
  const result = new THREE.Object3D();
  result.children = [...curves.map((e) => mapIfcGeometricPrimitive(e))];
  return result;
}

export { mapGeometricSet };
