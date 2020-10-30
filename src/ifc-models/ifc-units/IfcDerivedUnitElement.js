/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcderivedunitelement.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseMultiConstructor } from "../../ifc-utils/ifc-constructors";
import { getIfcSIUnit } from "./IfcSIUnit";

class IfcDerivedUnitElement extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.unit = getIfcSIUnit(this);
    this.exponent = this.extractNumber();
  }
}

function getIfcDerivedUnitElement(caller) {
  return baseMultiConstructor(caller, IfcDerivedUnitElement);
}

export { getIfcDerivedUnitElement };
