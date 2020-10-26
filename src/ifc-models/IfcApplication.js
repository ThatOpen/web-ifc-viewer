/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcutilityresource/lexical/ifcapplication.htm]
 */

import { IfcBase, baseConstructor } from "./IfcBase";
import { getIfcOrganization } from "./IfcOrganization";

class IfcApplication extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.applicationDeveloper = getIfcOrganization(this);
    this.version = this.extractText();
    this.applicationFullName = this.extractText();
    this.applicationIdentifier = this.extractText();
  }
}

function getIfcApplication(caller) {
  return baseConstructor(caller, IfcApplication);
}

export { getIfcApplication };
