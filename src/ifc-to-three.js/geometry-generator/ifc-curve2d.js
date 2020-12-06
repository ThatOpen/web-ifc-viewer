import { createLine } from "./three-lines.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcTypes as t } from "../../utils/ifc-types.js";

function mapCurve2D(shape) {
  const type = shape[n.items][0][n.ifcClass].toUpperCase();
  return curve2DMap[type](shape);
}

const curve2DMap = {
  [t.IfcPolyline]: mapPolyline,
  [t.IfcTrimmedCurve]: mapTrimmedCurve,
}

function mapPolyline(shape){
  const points = [];
  shape[n.items][0][n.points].forEach((point) => {
    points.push(point[n.coordinates]);
  });
  return createLine(points);
}

function mapTrimmedCurve(shape){
  console.log(shape);
}

export { mapCurve2D };
