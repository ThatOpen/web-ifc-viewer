import { namedProps as n } from "../../utils/global-constants.js";
import { mapIfcGeometricPrimitive } from "./ifc-geometricPrimitives.js";

function mapCurve2D(shape) {
  return mapIfcGeometricPrimitive(shape[n.items][0]);
}

export { mapCurve2D };
