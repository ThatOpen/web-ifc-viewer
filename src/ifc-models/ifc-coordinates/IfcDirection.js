/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcgeometryresource/lexical/ifcdirection.htm]
 */

import { IfcBase } from "../IfcBase";
import {
  baseConstructor,
  registerConstructorByType,
} from "../../ifc-utils/ifc-constructors";
import { ifcTypes as t } from "../../ifc-utils/ifc-types";

class IfcDirection extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.directionRatios = this.extractNumberSet();
  }
}

function getIfcDirection(caller, ifcLine) {
  return baseConstructor(caller, IfcDirection, ifcLine);
}

registerConstructorByType(t.ifcDirection, getIfcDirection);
