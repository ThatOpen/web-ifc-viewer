/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcmeasurewithunit.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseConstructor } from "../../ifc-utils/ifc-constructors";
import { getIfcSIUnit } from "./IfcSIUnit";

class IfcMeasureWithUnit extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.valueComponent = this.extractIfcValue();
    this.unitComponent = getIfcSIUnit(this);
  }
}

function getIfcMeasureWithUnit(caller) {
  return baseConstructor(caller, IfcMeasureWithUnit);
}

export { getIfcMeasureWithUnit };
