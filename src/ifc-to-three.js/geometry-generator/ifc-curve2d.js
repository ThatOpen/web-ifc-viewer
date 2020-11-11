import { createLine } from "./three-lines.js";
import {
  namedProps as n,
  typeValue as t,
} from "../../utils/global-constants.js";

function mapCurve2D(shape) {
  const points = [];
  shape[n.items][t.value][0][n.points][t.value].forEach((e) => {
    points.push(mapPoint(e));
  });
  return createLine(points);
}

function mapPoint(point) {
  return point[n.coordinates][t.value];
}

export { mapCurve2D };
