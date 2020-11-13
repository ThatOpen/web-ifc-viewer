import { trackProfileTransform } from "../geometry-transformer/local-transform-tracker.js";
import { createExtrusion } from "./three-extrusion.js";
import {
  namedProps as n,
  typeValue as t,
} from "../../utils/global-constants.js";
import { applyTransformsTo } from "../geometry-transformer/local-transform-applier.js";

function mapRectangleProfileExtrusion(extruded, product) {
  getgetRectProfileDimensions(extruded);
  trackProfileTransform(product, extruded.profile);
  const points = getRectProfilePoints(extruded);
  return createExtrusion(points, extruded.depth);
}

function getRectProfilePoints(extruded) {
  const xDim = extruded[n.xDim] / 2;
  const yDim = extruded[n.yDim] / 2;
  return [
    [-xDim, yDim],
    [xDim, yDim],
    [xDim, -yDim],
    [-xDim, -yDim],
  ];
}

function getgetRectProfileDimensions(extruded) {
  extruded[n.xDim] = extruded.profile[n.xDim][t.value];
  extruded[n.yDim] = extruded.profile[n.yDim][t.value];
}

export { mapRectangleProfileExtrusion };
