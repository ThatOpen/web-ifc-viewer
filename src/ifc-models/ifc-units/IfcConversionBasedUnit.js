/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcderivedunit.htm]
 */

import { baseConstructor } from "../../ifc-utils/ifc-constructor";
import { getIfcMeasureWithUnit } from "./IfcMeasureWithUnit";
import { IfcNamedUnit } from "./IfcNamedUnit";

class IfcConversionBasedUnit extends IfcNamedUnit {
  getIfcProperties() {
    super.getIfcProperties();
    this.name = this.extractText();
    this.conversionFactor = getIfcMeasureWithUnit(this, this.extractId());
  }
}

function getIfcConversionBasedUnit(caller, ifcLine) {
  return baseConstructor(caller, ifcLine, IfcConversionBasedUnit);
}

export { getIfcConversionBasedUnit };
