import { namedProps as n } from "../../../utils/global-constants.js";
import { ifcTypes as t } from "../../../utils/ifc-types.js";
import { mapPolyline } from "./polyline.js";
import { mapTrimmedCurve } from "./trimmed-curve.js";

function mapCurve2D(shape) {
  return mapCurve(shape[n.items][0]);
}

function mapCurve3D(shape) {
  return mapCurve(shape[n.items][0]);
}

function mapCurve(shape){
  const ifcClass = shape[n.ifcClass].toUpperCase();
  return curve2DMap[ifcClass](shape);
}

const curve2DMap = {
  [t.IfcPolyline]: mapPolyline,
  [t.IfcTrimmedCurve]: mapTrimmedCurve,
}

export { mapCurve, mapCurve2D, mapCurve3D };