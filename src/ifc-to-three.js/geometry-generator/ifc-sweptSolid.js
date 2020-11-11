import { mapRectangleProfileExtrusion } from "./ifc-profileRectangle.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import {
  defaultValue,
  namedProps as n,
  pivots as p,
  typeValue as v,
} from "../../utils/global-constants.js";
import { mapArbitraryProfileExtrusion } from "./ifc-profileArbitrary.js";

function mapSweptSolid(shape) {
  const extruded = getExtrusionProps(shape);
  if (extruded.ifcClass === getName(t.IfcRectangleProfileDef))
    return mapRectangleProfileExtrusion(extruded);
  if (extruded.ifcClass === getName(t.IfcArbitraryClosedProfileDef))
    return mapArbitraryProfileExtrusion(extruded);
}

function getExtrusionProps(shape) {
  const extruded = shape[n.items][v.value][0];
  return {
    profile: extruded[n.sweptArea][v.value],
    ifcClass: extruded[n.sweptArea][v.value][n.ifcClass],
    depth: extruded[n.depth][v.value],
    direction: extruded[n.extDirection][v.value][n.dirRatios][v.value],
    pivots: getExtrusionPivots(extruded),
  };
}

function getExtrusionPivots(extruded) {
  const position = extruded[n.position][v.value];
  return {
    [p.locations]: [position[n.location][v.value][n.coordinates][v.value]],
    [p.xRotation]: [getExtrusionXAxis(position)],
    [p.zRotation]: [getExtrusionZAxis(position)],
  };
}

function getExtrusionZAxis(position) {
  return position[n.axis][v.value] === defaultValue
    ? [0, 0, 1]
    : position[n.axis][v.value][n.dirRatios][v.value];
}

function getExtrusionXAxis(position) {
  return position[n.refDirection][v.value] === defaultValue
    ? [1, 0, 0]
    : position[n.refDirection][v.value][n.dirRatios][v.value];
}

export { mapSweptSolid };
