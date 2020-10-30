/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcunitassignment.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseConstructor } from "../../ifc-utils/ifc-constructors";
import { ifcTypes as t } from "../../ifc-utils/ifc-types";
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
    if (e.type === t.ifcSIUnit) return getIfcSIUnitGlobal(this, e);
    if (e.type === t.ifcDerivedUnit) return getIfcDerivedUnitGlobal(this, e);
    return getIfcConversionBasedUnitGlobal(this, e);
  }
}

function getIfcUnitAssignment(caller) {
  return baseConstructor(caller, IfcUnitAssignment);
}

export { getIfcUnitAssignment };
