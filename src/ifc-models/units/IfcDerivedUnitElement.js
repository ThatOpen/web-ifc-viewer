/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcderivedunitelement.htm]
 */

import { baseMultiConstructor, IfcBase } from "../IfcBase";
import { getIfcSIUnit } from "./IfcSIUnit";

class IfcDerivedUnitElement extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.unit = getIfcSIUnit(this, this.extractId());
    this.exponent = this.extractNumber();
  }
}

function getIfcDerivedUnitElement(caller) {
  return baseMultiConstructor(caller, IfcDerivedUnitElement);
}

export { getIfcDerivedUnitElement };
