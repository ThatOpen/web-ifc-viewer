/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2/HTML/schema/ifckernel/lexical/ifcreldecomposes.htm]
 */

import { baseConstructorNoExtraction } from "../../ifc-utils/ifc-constructor";
import { ifcTypes as t } from "../../ifc-utils/ifc-types";
import { getIfcBuilding } from "../ifc-spatial-structure/IfcBuilding";
import { getIfcBuildingStorey } from "../ifc-spatial-structure/IfcBuildingStorey";
import { getIfcSite } from "../ifc-spatial-structure/IfcSite";
import { getIfcSpace } from "../ifc-spatial-structure/IfcSpace";
import { IfcRelDecomposes } from "./IfcRelDecomposes";

class IfcRelAggregates extends IfcRelDecomposes {
  getIfcProperties() {
    super.getIfcProperties();
    this.relatingObject = this.extractId();
    this.relatedObjects = this.getRelatedObjects();
  }

  getRelatedObjects() {
    return this.extractIdSet().map((e) => {
      if (e.type === t.ifcBuilding) return getIfcBuilding(this, e);
      if (e.type === t.ifcSite) return getIfcSite(this, e);
      if (e.type === t.ifcSpace) return getIfcSpace(this, e);
      return getIfcBuildingStorey(this, e);
    });
  }
}

function getIfcRelAggregates(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcRelAggregates, ifcLine);
}

export { getIfcRelAggregates };
