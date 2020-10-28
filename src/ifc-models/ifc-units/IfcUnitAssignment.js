/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcunitassignment.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseConstructor } from "../../ifc-utils/ifc-constructor";
import { ifcTypes } from "../../ifc-utils/ifc-types";
import { getIfcSIUnitGlobal } from "./IfcSIUnit";
import { getIfcDerivedUnitGlobal } from "./IfcDerivedUnit";
import { getIfcConversionBasedUnitGlobal } from "./IfcConversionBasedUnit";

class IfcUnitAssignment extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.units = this.getGlobalUnits();
  }

  getGlobalUnits() {
    return this.isEmptySet()
      ? this.extractEmptySet()
      : this.extractIdSet().map((e) => this.getGlobalUnit(e));
  }

  getGlobalUnit(e) {
    return e.type === ifcTypes.ifcSIUnit
      ? getIfcSIUnitGlobal(this, e)
      : e.type === ifcTypes.ifcDerivedUnit
      ? getIfcDerivedUnitGlobal(this, e)
      : getIfcConversionBasedUnitGlobal(this, e);
  }
}

function getIfcUnitAssignment(caller) {
  return baseConstructor(caller, IfcUnitAssignment);
}

export { getIfcUnitAssignment };
