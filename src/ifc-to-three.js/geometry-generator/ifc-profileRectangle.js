import { getPivots } from "../geometry-transformer/pivots.js";
import { createExtrusion } from "./three-extrusion.js";
import {
  namedProps as n,
  pivots as p,
  typeValue as t,
} from "../../utils/global-constants.js";

function mapRectangleProfileExtrusion(extruded) {
  getgetRectProfileDimensions(extruded);
  getRectProfilePivots(extruded);
  const points = getRectProfilePoints(extruded);
  const pivots = getPivots(extruded.pivots);
  return createExtrusion(points, extruded.depth, pivots);
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

function getRectProfilePivots(extruded) {
  console.log(extruded);
  const profile = extruded.profile;
  const position = profile[n.position][t.value];
  const location = position[n.location][t.value][n.coordinates][t.value];
  extruded.pivots[p.locations].push([location[0], location[1], 0]);
  extruded.pivots[p.xRotation].push(
    position[n.refDirection][t.value][n.dirRatios][t.value]
  );
  extruded.pivots[p.zRotation].push([0, 0, 1]);
}

function getgetRectProfileDimensions(extruded) {
  extruded[n.xDim] = extruded.profile[n.xDim][t.value];
  extruded[n.yDim] = extruded.profile[n.yDim][t.value];
}

export { mapRectangleProfileExtrusion };
