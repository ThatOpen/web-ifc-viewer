import { trackLocalTransform } from "../geometry-transformer/local-transform-tracker.js";
import { createCircularExtrusion } from "./three-extrusion.js";
import { namedProps as n } from "../../utils/global-constants.js";

function mapCircleProfileExtrusion(extruded, product) {
  const position = extruded.profile[n.position];
  trackLocalTransform(product, position, n.transformOfExtrusion);
  const radius = extruded.profile[n.radius];
  return createCircularExtrusion(radius, extruded.depth);
}

export { mapCircleProfileExtrusion };
