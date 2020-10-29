/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcproject.htm]
 */

import { IfcObject } from "../ifc-base-classes/IfcObject";
import { IfcEntityFinder } from "../../ifc-utils/items-finder";
import { readIfcItems } from "../../ifc-loader/ifc-items-reader";
import { getIfcGeometricRepresentationContexts } from "../ifc-contexts/IfcGeometricRepresentationContext";
import { getIfcUnitAssignment } from "../ifc-units/IfcUnitAssignment";
import { ifcTypes } from "../../ifc-utils/ifc-types";
import { getIfcRelAggregates } from "../ifc-relationships/IfcRelAggregates";

class IfcProject extends IfcObject {
  getIfcProperties() {
    super.getIfcProperties();
    this.longName = this.extractText();
    this.phase = this.extractText();
    this.representationContexts = getIfcGeometricRepresentationContexts(this);
    this.unitsInContext = getIfcUnitAssignment(this);
    this.spatialStructure = this.getSpatialStructure();
  }

  getSpatialStructure() {
    return this.getFinder()
      .findIfcRelAggregates()
      .map((e) => getIfcRelAggregates(this, e));
  }
}

function getIfcProject(loadedIfc) {
  const finder = new IfcEntityFinder(readIfcItems(loadedIfc));
  return new IfcProject(finder, finder.findFirstByType(ifcTypes.ifcProject));
}

export { getIfcProject };
