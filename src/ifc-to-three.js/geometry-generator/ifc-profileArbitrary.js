import { createExtrusion } from "./three-extrusion.js";
import {
  namedProps as n,
  typeValue as v,
} from "../../utils/global-constants.js";
import { getName, ifcTypes } from "../../utils/ifc-types.js";

function mapArbitraryProfileExtrusion(extruded, product) {
  const points = getArbitraryProfilePoints(extruded);
  return createExtrusion(points, extruded.depth);
}

function getArbitraryProfilePoints(extruded) {
  const profile = extruded.profile;
  const points = profile[n.outerCurve][v.value][n.points][v.value];
  return points.map((point) => {
    const coords = point[n.coordinates][v.value];
    return [-coords[0], -coords[1]];
  });
}

export { mapArbitraryProfileExtrusion };
