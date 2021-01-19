import { createExtrusionsByPoints } from "../three-geometry/three-extrusion.js";
import { namedProps as n } from "../../../utils/global-constants.js";
import { applyTransformsToGeometry } from "../../geometry-transformer/local-transform-applier.js";

function mapRectangleProfileExtrusion(extruded, product) {
  getRectProfileDimensions(extruded);
  const position = extruded.profile[n.position];
  const points = getRectProfilePoints(extruded);
  const geometry = createExtrusionsByPoints(points, extruded.depth, extruded.direction);
  applyTransformsToGeometry(geometry, position);
  return geometry;
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
