/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcunitassignment.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseConstructor } from "../../ifc-utils/ifc-constructors";
import { ifcTypes as t } from "../../ifc-utils/ifc-types";
import { getIfcSIUnit } from "./IfcSIUnit";
import { getIfcDerivedUnit } from "./IfcDerivedUnit";
import { getIfcConversionBasedUnit } from "./IfcConversionBasedUnit";

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
    if (e.type === t.ifcSIUnit) return getIfcSIUnit(this, e);
    if (e.type === t.ifcDerivedUnit) return getIfcDerivedUnit(this, e);
    return getIfcConversionBasedUnit(this, e);
  }
}

function getIfcUnitAssignment(caller, ifcLine) {
  return baseConstructor(caller, IfcUnitAssignment, ifcLine);
}

export { getIfcUnitAssignment };
