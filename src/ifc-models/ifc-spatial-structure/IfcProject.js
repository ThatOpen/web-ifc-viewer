/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcproject.htm]
 */

import { IfcObject } from "../ifc-base-classes/IfcObject";
import { IfcEntityFinder } from "../../ifc-utils/finders/items-finder";
import { readIfcItems } from "../../ifc-loader/ifc-items-reader";
import { getIfcGeometricRepresentationContexts } from "../ifc-contexts/IfcGeometricRepresentationContext";
import { getIfcUnitAssignment } from "../ifc-units/IfcUnitAssignment";
import { ifcTypes } from "../../ifc-utils/ifc-types";
import { getIfcSite } from "./IfcSite";

class IfcProject extends IfcObject {
  getIfcProperties() {
    super.getIfcProperties();
    this.longName = this.extractText();
    this.phase = this.extractText();
    this.representationContexts = getIfcGeometricRepresentationContexts(this);
    this.unitsInContext = getIfcUnitAssignment(this);
    this.spatialStructure = this.getIfcSites();
  }

  getIfcSites() {
    return this.getFinder()
      .getSpatial()
      .findIfcSites(this.expressId)
      .map((e) => getIfcSite(this, e));
  }
}

function getIfcProject(loadedIfc) {
  const finder = new IfcEntityFinder(readIfcItems(loadedIfc));
  return new IfcProject(finder, finder.findFirstByType(ifcTypes.ifcProject));
}

export { getIfcProject };
