import { createExtrusionsByPoints } from "../three-geometry/three-extrusion.js";
import { namedProps as n } from "../../../utils/global-constants.js";
import { applyTransformsToGeometry } from "../../geometry-transformer/local-transform-applier.js";

function mapRectangleProfileExtrusion(extruded: any, product: any) {
  getRectProfileDimensions(extruded);
  const position = extruded.profile[n.position];
  const points = getRectProfilePoints(extruded);
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  const geometry = createExtrusionsByPoints(points, extruded.depth, extruded.direction);
  applyTransformsToGeometry(geometry, position);
  return geometry;
}

function getRectProfilePoints(extruded: any) {
  const halfWidth = extruded[n.xDim] / 2;
  const halfHeight = extruded[n.yDim] / 2;
  return [
    [-halfWidth, halfHeight],
    [halfWidth, halfHeight],
    [halfWidth, -halfHeight],
    [-halfWidth, -halfHeight],
  ];
}

function getRectProfileDimensions(extruded: any) {
  extruded[n.xDim] = extruded.profile[n.xDim];
  extruded[n.yDim] = extruded.profile[n.yDim];
}

export { mapRectangleProfileExtrusion };
