/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcderivedunit.htm]
 */

import { IfcBase } from "../IfcBase";
import {
  baseConstructor,
  baseConstructorNoExtraction,
} from "../../ifc-utils/ifc-constructors";
import { getIfcDerivedUnitElement } from "./IfcDerivedUnitElement";

class IfcDerivedUnit extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.elements = getIfcDerivedUnitElement(this);
    this.unitType = this.extractEnum();
    this.userDefinedType = this.extractText();
  }
}

function getIfcDerivedUnit(caller) {
  return baseConstructor(caller, IfcDerivedUnit);
}

function getIfcDerivedUnitGlobal(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcDerivedUnit, ifcLine);
}

export { getIfcDerivedUnit, getIfcDerivedUnitGlobal };
