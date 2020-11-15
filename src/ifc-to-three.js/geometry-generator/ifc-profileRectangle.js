import { trackLocalTransform } from "../geometry-transformer/local-transform-tracker.js";
import { createExtrusion, createHorizontalExtrusion } from "./three-extrusion.js";
import {
  namedProps as n,
  typeValue as t,
} from "../../utils/global-constants.js";
import { getName, ifcTypes } from "../../utils/ifc-types.js";

function mapRectangleProfileExtrusion(extruded, product) {
  console.log(product);
  getRectProfileDimensions(extruded);
  const position = extruded.profile[n.position][t.value];
  trackLocalTransform(product, position, n.transformOfExtrusion);
  return constructRectExtrusion(extruded, product);
}

function constructRectExtrusion(extruded, product){
  const points = getRectProfilePoints(extruded);
  if(product[n.ifcClass]===getName(ifcTypes.IfcOpeningElement))
    return createHorizontalExtrusion(points, extruded.depth);
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
  extruded[n.xDim] = extruded.profile[n.xDim][t.value];
  extruded[n.yDim] = extruded.profile[n.yDim][t.value];
}

export { mapRectangleProfileExtrusion };
