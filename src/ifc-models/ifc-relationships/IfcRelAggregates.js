/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2/HTML/schema/ifckernel/lexical/ifcreldecomposes.htm]
 */

import {
  baseConstructorNoExtraction,
  getItemByType,
} from "../../ifc-utils/ifc-constructors";
import { ifcTypes as t } from "../../ifc-utils/ifc-types";
import { getIfcBuilding } from "../ifc-spatial-structure/IfcBuilding";
import { getIfcBuildingStorey } from "../ifc-spatial-structure/IfcBuildingStorey";
import { getIfcProject } from "../ifc-spatial-structure/IfcProject";
import { getIfcSite } from "../ifc-spatial-structure/IfcSite";
import { getIfcSpace } from "../ifc-spatial-structure/IfcSpace";
import { IfcRelDecomposes } from "./IfcRelDecomposes";

class IfcRelAggregates extends IfcRelDecomposes {
  getIfcProperties() {
    super.getIfcProperties();
    this.relatingObject = getItemByType(this, this.extractId());
    this.relatedObjects = this.extractIdSet().map((e) =>
      getItemByType(this, e)
    );
  }

  getSpatialStructureItem(e) {
    if (e.type === t.ifcProject) return getIfcProject(this, e);
    if (e.type === t.ifcBuilding) return getIfcBuilding(this, e);
    if (e.type === t.ifcSite) return getIfcSite(this, e);
    if (e.type === t.ifcSpace) return getIfcSpace(this, e);
    if (e.type === t.ifcBuildingStorey) return getIfcBuildingStorey(this, e);
    return e;
  }
}

function getIfcRelAggregates(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcRelAggregates, ifcLine);
}

export { getIfcRelAggregates };
