/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcproject.htm]
 */

import { IfcObject } from "../ifc-base-classes/IfcObject";
import { getIfcGeometricRepresentationContexts } from "../ifc-contexts/IfcGeometricRepresentationContext";
import { getIfcUnitAssignment } from "../ifc-units/IfcUnitAssignment";
import { ifcTypes as t } from "../../ifc-utils/ifc-types";
import { getIfcRelAggregates } from "../ifc-relationships/IfcRelAggregates";
import { createIfcItemsFinder } from "../../ifc-utils/items-finder";
import {
  baseConstructorNoExtraction,
  registerConstructorByType,
} from "../../ifc-utils/ifc-constructors";

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

function constructIfcProject(loadedIfc) {
  const finder = createIfcItemsFinder(loadedIfc);
  return new IfcProject(finder, finder.findFirstByType(t.ifcProject));
}

function getIfcProject(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcProject, ifcLine);
}

registerConstructorByType(t.ifcProject, getIfcProject);

export { getIfcProject, constructIfcProject };
