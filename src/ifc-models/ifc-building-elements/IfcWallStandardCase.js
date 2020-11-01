/**
 * [https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcsharedbldgelements/lexical/ifcwallstandardcase.htm]
 */
import {
  baseConstructor,
  registerConstructorByType,
} from "../../ifc-utils/ifc-constructors.js";
import { IfcWall } from "./IfcWall.js";
import { ifcTypes as t } from "../../ifc-utils/ifc-types.js";

class IfcWallStandardCase extends IfcWall {}

function getIfcWallStandardCase(caller, ifcLine) {
  return baseConstructor(caller, IfcWallStandardCase, ifcLine);
}

registerConstructorByType(t.ifcWallStandardCase, getIfcWallStandardCase);
