import { createCircularExtrusion } from "./three-extrusion.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { applyTransformsToGeometry } from "../geometry-transformer/local-transform-applier.js";

function mapCircleProfileExtrusion(extruded, product) {
  const position = extruded.profile[n.position];
  const radius = extruded.profile[n.radius];
  const cylinder = createCircularExtrusion(radius, extruded.depth);
  applyTransformsToGeometry(cylinder, position);
  return cylinder;
}

export { mapCircleProfileExtrusion };
