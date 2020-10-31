/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcsiunit.htm]
 */

import { IfcNamedUnit } from "./IfcNamedUnit";
import { baseConstructor } from "../../ifc-utils/ifc-constructors";

class IfcSIUnit extends IfcNamedUnit {
  getIfcProperties() {
    super.getIfcProperties();
    this.prefix = this.extractEnum();
    this.name = this.extractEnum();
  }
}

function getIfcSIUnit(caller, ifcLine) {
  return baseConstructor(caller, IfcSIUnit, ifcLine);
}

export { getIfcSIUnit };
