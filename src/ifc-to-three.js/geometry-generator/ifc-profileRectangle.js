import { trackLocalTransform } from "../geometry-transformer/local-transform-tracker.js";
import { createExtrusion } from "./three-extrusion.js";
import { namedProps as n } from "../../utils/global-constants.js";

function mapRectangleProfileExtrusion(extruded, product) {
  getRectProfileDimensions(extruded);
  const position = extruded.profile[n.position];
  trackLocalTransform(product, position, n.transformOfExtrusion);
  const points = getRectProfilePoints(extruded);
  return createExtrusion(points, extruded.depth);
}

function getRectProfilePoints(extruded) {
  const halfWidth = extruded[n.xDim] / 2;
  const halfHeight = extruded[n.yDim] / 2;
  return [
    [-halfWidth, halfHeight],
    [halfWidth, halfHeight],
    [halfWidth, -halfHeight],
    [-halfWidth, -halfHeight],
  ];
}

function getRectProfileDimensions(extruded) {
  extruded[n.xDim] = extruded.profile[n.xDim];
  extruded[n.yDim] = extruded.profile[n.yDim];
}

export { mapRectangleProfileExtrusion };
