import { mapRectangleProfileExtrusion } from "./ifc-profileRectangle.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import { mapArbitraryProfileExtrusion } from "./ifc-profileArbitrary.js";
import { trackLocalTransform } from "../geometry-transformer/local-transform-tracker.js";
import { applyTransformsTo } from "../geometry-transformer/local-transform-applier.js";
import {
  namedProps as n,
  typeValue as v,
} from "../../utils/global-constants.js";

function mapSweptSolid(shape, product) {
  const extruded = shape[n.items][v.value][0];
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
    profile:    extruded[n.sweptArea][v.value],
    ifcClass:   extruded[n.sweptArea][v.value][n.ifcClass],
    depth:      extruded[n.depth][v.value],
    direction:  extruded[n.extDirection][v.value][n.dirRatios][v.value],
  };
}

function trackLocalTransformation(product, extruded) {
  const position = extruded[n.position][v.value];
  trackLocalTransform(product, position, n.transformOfExtrusion);
}

export { mapSweptSolid };
