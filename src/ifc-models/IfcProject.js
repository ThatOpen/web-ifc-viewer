/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcproject.htm]
 */

import IfcObject from "./IfcObject";
import { ifcTypes, ifcFinder } from "../ifc-utils/items-finder";
import { readIfcItems } from "../ifc-parser/ifc-items-reader";

class IfcProject extends IfcObject {
  getIfcProperties() {
    super.getIfcProperties();
    this.longName = this.extractText();
    this.phase = this.extractText();
    this.representationContexts = this.extractIdSet();
    this.unitsInContext = this.extractId();
  }
}

function getIfcProject(loadedIfc) {
  const finder = new ifcFinder(readIfcItems(loadedIfc));
  return new IfcProject(finder, finder.findFirstByType(ifcTypes.ifcProject));
}

export { getIfcProject };
