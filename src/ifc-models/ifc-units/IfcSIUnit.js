/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcsiunit.htm]
 */

import { IfcNamedUnit } from "./IfcNamedUnit";
import { baseConstructor } from "../../ifc-utils/ifc-constructor";

class IfcSIUnit extends IfcNamedUnit {
  getIfcProperties() {
    super.getIfcProperties();
    this.prefix = this.extractEnum();
    this.name = this.extractEnum();
  }
}

function getIfcSIUnit(caller, IfcLine) {
  return baseConstructor(caller, IfcLine, IfcSIUnit);
}

export { getIfcSIUnit };
