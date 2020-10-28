/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcactorresource/lexical/ifcorganization.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseConstructor } from "../../ifc-utils/ifc-constructor";

class IfcOrganization extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.id = this.extractText();
    this.name = this.extractText();
    this.description = this.extractText();
    this.roles = this.extractIdSet();
    this.addresses = this.extractIdSet();
  }
}

function getIfcOrganization(caller) {
  return baseConstructor(caller, IfcOrganization);
}

export { getIfcOrganization };
