/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcgeometryresource/lexical/ifcdirection.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseConstructor } from "../../ifc-utils/ifc-constructor";

class IfcDirection extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.directionRatios = this.extractNumberSet();
  }
}

function getIfcDirection(caller, ifcLine) {
  return baseConstructor(caller, ifcLine, IfcDirection);
}

export { getIfcDirection };
