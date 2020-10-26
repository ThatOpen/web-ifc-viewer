/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcderivedunit.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseConstructor } from "../../ifc-utils/ifc-constructor";
import { getIfcDerivedUnitElement } from "./IfcDerivedUnitElement";

class IfcDerivedUnit extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.elements = getIfcDerivedUnitElement(this);
    this.unitType = this.extractEnum();
    this.userDefinedType = this.extractText();
  }
}

function getIfcDerivedUnit(caller, ifcLine) {
  return baseConstructor(caller, ifcLine, IfcDerivedUnit);
}

export { getIfcDerivedUnit };
