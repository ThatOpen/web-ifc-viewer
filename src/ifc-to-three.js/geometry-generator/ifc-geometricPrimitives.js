import { createLine } from "./three-lines.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcTypes as t } from "../../utils/ifc-types.js";

function mapIfcGeometricPrimitive(shape){
  const ifcClass = shape[n.ifcClass].toUpperCase();
  return curve2DMap[ifcClass](shape);
}

const curve2DMap = {
  [t.IfcPolyline]: mapPolyline,
  [t.IfcTrimmedCurve]: mapTrimmedCurve,
}

function mapPolyline(shape){
  const points = [];
  shape[n.points].forEach((point) => {
    points.push(point[n.coordinates]);
  });
  return createLine(points);
}

function mapTrimmedCurve(shape){
  console.log(shape);
}

export { mapIfcGeometricPrimitive };