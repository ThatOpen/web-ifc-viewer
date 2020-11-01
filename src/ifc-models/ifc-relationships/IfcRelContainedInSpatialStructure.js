/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD1/HTML/schema/ifcproductextension/lexical/ifcrelcontainedinspatialstructure.htm]
 */

import {
  baseConstructor,
  getItemByType,
  registerConstructorByType,
} from "../../ifc-utils/ifc-constructors.js";
import { ifcTypes as t } from "../../ifc-utils/ifc-types.js";
import { IfcRelConnects } from "./IfcRelConnects.js";

class IfcRelContainedInSpatialStructure extends IfcRelConnects {
  getIfcProperties() {
    super.getIfcProperties();
    this.relatedElements = this.extractIdSet().map((e) =>
      getItemByType(this, e)
    );
    this.relatingStructure = getItemByType(this, this.extractId());
  }
}

function getIfcRelContainedInSpatialStructure(caller, ifcLine) {
  return baseConstructor(caller, IfcRelContainedInSpatialStructure, ifcLine);
}

registerConstructorByType(
  t.ifcRelContainedInSpatialStructure,
  getIfcRelContainedInSpatialStructure
);
