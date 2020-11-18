import { createLine } from "./three-lines.js";
import { namedProps as n } from "../../utils/global-constants.js";

function mapCurve2D(shape) {
  const points = [];
  shape[n.items][0][n.points].forEach((point) => {
    points.push(point[n.coordinates]);
  });
  return createLine(points);
}

export { mapCurve2D };
