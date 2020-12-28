import { namedProps as n } from "../../utils/global-constants.js";
import { mapCurve } from "./ifc-cuves.js";

function mapCurve2D(shape) {
  return mapCurve(shape[n.items][0]);
}

export { mapCurve2D };
