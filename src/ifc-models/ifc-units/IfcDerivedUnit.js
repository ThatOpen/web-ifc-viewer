/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcmeasureresource/lexical/ifcderivedunit.htm]
 */

import { IfcBase } from "../IfcBase";
import {
  baseConstructor,
  getItemByType,
  registerConstructorByType,
} from "../../ifc-utils/ifc-constructors";
import { ifcTypes as t } from "../../ifc-utils/ifc-types";

class IfcDerivedUnit extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.elements = this.extractIdSet().map((e) => getItemByType(this, e));
    this.unitType = this.extractEnum();
    this.userDefinedType = this.extractText();
  }
}

function getIfcDerivedUnit(caller, ifcLine) {
  return baseConstructor(caller, IfcDerivedUnit, ifcLine);
}

registerConstructorByType(t.ifcDerivedUnit, getIfcDerivedUnit);
