import { createExtrusion } from "./three-extrusion.js";
import { getPivots } from "../geometry-transformer/pivots.js";
import {
  namedProps as n,
  typeValue as v,
} from "../../utils/global-constants.js";

function mapArbitraryProfileExtrusion(extruded) {
  const points = getArbitraryProfilePoints(extruded);
  const pivots = getPivots(extruded.pivots);
  return createExtrusion(points, extruded.depth, pivots);
}

function getArbitraryProfilePoints(extruded) {
  const profile = extruded.profile;
  const points = profile[n.outerCurve][v.value][n.points][v.value];
  return points.map((point) => {
    return point[n.coordinates][v.value];
  });
}

export { mapArbitraryProfileExtrusion };
