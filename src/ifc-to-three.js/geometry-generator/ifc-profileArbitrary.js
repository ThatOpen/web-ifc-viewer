import { createExtrusion } from "./three-extrusion.js";
import {
  namedProps as n,
  typeValue as v,
} from "../../utils/global-constants.js";

function mapArbitraryProfileExtrusion(extruded) {
  const points = getArbitraryProfilePoints(extruded);
  return createExtrusion(points, extruded.depth);
}

function getArbitraryProfilePoints(extruded) {
  const profile = extruded.profile;
  const points = profile[n.outerCurve][v.value][n.points][v.value];
  return points.map((point) => {
    return point[n.coordinates][v.value];
  });
}

export { mapArbitraryProfileExtrusion };
