/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2/HTML/schema/ifckernel/lexical/ifcreldecomposes.htm]
 */

import {
  baseConstructorNoExtraction,
  getItemByType,
} from "../../ifc-utils/ifc-constructors";
import { IfcRelDecomposes } from "./IfcRelDecomposes";

class IfcRelAggregates extends IfcRelDecomposes {
  getIfcProperties() {
    super.getIfcProperties();
    this.relatingObject = getItemByType(this, this.extractId());
    this.relatedObjects = this.extractIdSet().map((e) =>
      getItemByType(this, e)
    );
  }
}

function getIfcRelAggregates(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcRelAggregates, ifcLine);
}

export { getIfcRelAggregates };
