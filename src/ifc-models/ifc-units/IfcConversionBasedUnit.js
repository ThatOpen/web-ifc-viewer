/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcderivedunit.htm]
 */

import {
  baseConstructor,
  baseConstructorNoExtraction,
} from "../../ifc-utils/ifc-constructors";
import { getIfcMeasureWithUnit } from "./IfcMeasureWithUnit";
import { IfcNamedUnit } from "./IfcNamedUnit";

class IfcConversionBasedUnit extends IfcNamedUnit {
  getIfcProperties() {
    super.getIfcProperties();
    this.name = this.extractText();
    this.conversionFactor = getIfcMeasureWithUnit(this);
  }
}

function getIfcConversionBasedUnit(caller) {
  return baseConstructor(caller, IfcConversionBasedUnit);
}

function getIfcConversionBasedUnitGlobal(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcConversionBasedUnit, ifcLine);
}

export { getIfcConversionBasedUnit, getIfcConversionBasedUnitGlobal };
