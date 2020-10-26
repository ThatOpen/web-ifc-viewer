/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcunitassignment.htm]
 */

import { IfcBase, baseConstructor } from "../IfcBase";
import { getIfcSIUnit } from "./IfcSIUnit";
import { ifcTypes } from "../../ifc-utils/ifc-types";
import { getIfcDerivedUnit } from "./IfcDerivedUnit";
import { getIfcConversionBasedUnit } from "./IfcConversionBasedUnit";

class IfcUnitAssignment extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.units = this.getAllUnits();
  }

  getAllUnits() {
    return this.isEmptySet()
      ? this.extractEmptySet()
      : this.extractIdSet().map((e) => {
          return e.type === ifcTypes.ifcSIUnit
            ? getIfcSIUnit(this, e)
            : e.type === ifcTypes.ifcDerivedUnit
            ? getIfcDerivedUnit(this, e)
            : getIfcConversionBasedUnit(this, e);
        });
  }
}

function getIfcUnitAssignment(caller) {
  return baseConstructor(caller, caller.extractId(), IfcUnitAssignment);
}

export { getIfcUnitAssignment };
