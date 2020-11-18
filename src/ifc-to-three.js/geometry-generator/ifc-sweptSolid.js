import { mapRectangleProfileExtrusion } from "./ifc-profileRectangle.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import { mapArbitraryProfileExtrusion } from "./ifc-profileArbitrary.js";
import { trackLocalTransform } from "../geometry-transformer/local-transform-tracker.js";
import { applyTransformsTo } from "../geometry-transformer/local-transform-applier.js";
import { namedProps as n } from "../../utils/global-constants.js";

function mapSweptSolid(shape, product) {
  const extruded = shape[n.items][0];
  return constructSweptSolid(product, extruded);
}

//Beware: the creation of the solid must occur BEFORE trackLocalTransformation()
//Because the local transformations are tracked from inside to outside
//Same logic as IfcLocalPlacement used to locate the products

function constructSweptSolid(product, extruded) {
  const extrudedProps = getExtrusionProps(extruded);
  const solid = selectSpecificProfileMapper(extrudedProps, product);
  trackLocalTransformation(product, extruded);
  applyTransformsTo(product, solid, n.transformOfExtrusion);
  return solid;
}

function selectSpecificProfileMapper(extruded, product) {
  if (extruded.ifcClass === getName(t.IfcRectangleProfileDef))
    return mapRectangleProfileExtrusion(extruded, product);
  if (extruded.ifcClass === getName(t.IfcArbitraryClosedProfileDef))
    return mapArbitraryProfileExtrusion(extruded, product);
}

function getExtrusionProps(extruded) {
  return {
    profile: extruded[n.sweptArea],
    ifcClass: extruded[n.sweptArea][n.ifcClass],
    depth: extruded[n.depth],
    direction: extruded[n.extDirection][n.dirRatios],
  };
}

function trackLocalTransformation(product, extruded) {
  const position = extruded[n.position];
  trackLocalTransform(product, position, n.transformOfExtrusion);
}

export { mapSweptSolid };
