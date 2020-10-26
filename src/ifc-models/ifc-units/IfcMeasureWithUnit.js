/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcmeasurewithunit.htm]
 */

import { baseConstructor, IfcBase } from "../IfcBase";
import { getIfcSIUnit } from "./IfcSIUnit";

class IfcMeasureWithUnit extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.valueComponent = this.extractIfcValue();
    this.unitComponent = getIfcSIUnit(this, this.extractId());
  }
}

function getIfcMeasureWithUnit(caller, ifcLine) {
  return baseConstructor(caller, ifcLine, IfcMeasureWithUnit);
}

export { getIfcMeasureWithUnit };
