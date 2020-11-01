/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifcsharedbldgelements/lexical/ifcslab.htm]
 */
import {
  baseConstructor,
  getItemByType,
  registerConstructorByType,
} from "../../ifc-utils/ifc-constructors.js";
import { IfcBuildingElement } from "../ifc-base-classes/IfcBuildingElement.js";
import { ifcTypes as t } from "../../ifc-utils/ifc-types.js";

class IfcSlab extends IfcBuildingElement {
  getIfcProperties() {
    super.getIfcProperties();
    this.predefinedType = this.extractEnum();
  }
}

function getIfcSlab(caller, ifcLine) {
  return baseConstructor(caller, IfcSlab, ifcLine);
}

registerConstructorByType(t.ifcSlab, getIfcSlab);
