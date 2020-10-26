/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcproject.htm]
 */

import IfcObject from "../ifc-base-classes/IfcObject";
import { ifcFinder } from "../../ifc-utils/items-finder";
import { readIfcItems } from "../../ifc-loader/ifc-items-reader";
import { getIfcGeometricRepresentationContexts } from "../ifc-contexts/IfcGeometricRepresentationContext";
import { getIfcUnitAssignment } from "../ifc-units/IfcUnitAssignment";
import { ifcTypes } from "../../ifc-utils/ifc-types";

class IfcProject extends IfcObject {
  getIfcProperties() {
    super.getIfcProperties();
    this.longName = this.extractText();
    this.phase = this.extractText();
    this.representationContexts = getIfcGeometricRepresentationContexts(this);
    this.unitsInContext = getIfcUnitAssignment(this);
  }
}

function getIfcProject(loadedIfc) {
  const finder = new ifcFinder(readIfcItems(loadedIfc));
  return new IfcProject(finder, finder.findFirstByType(ifcTypes.ifcProject));
}

export { getIfcProject };
