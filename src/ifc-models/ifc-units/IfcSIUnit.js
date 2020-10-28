/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcsiunit.htm]
 */

import { IfcNamedUnit } from "./IfcNamedUnit";
import {
  baseConstructor,
  baseConstructorNoExtraction,
} from "../../ifc-utils/ifc-constructor";

class IfcSIUnit extends IfcNamedUnit {
  getIfcProperties() {
    super.getIfcProperties();
    this.prefix = this.extractEnum();
    this.name = this.extractEnum();
  }
}

function getIfcSIUnit(caller) {
  return baseConstructor(caller, IfcSIUnit);
}

function getIfcSIUnitGlobal(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcSIUnit, ifcLine);
}

export { getIfcSIUnit, getIfcSIUnitGlobal };
