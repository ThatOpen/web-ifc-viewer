/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcutilityresource/lexical/ifcapplication.htm]
 */

import IfcBase from "./IfcBase";
import { getIfcOrganization } from "./IfcOrganization";

class IfcApplication extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.applicationDeveloper = getIfcOrganization(
      this.finder,
      this.extractId()
    );
    this.version = this.extractText();
    this.applicationFullName = this.extractText();
    this.applicationIdentifier = this.extractText();
  }
}

function getIfcApplication(ifcItemsFinder, rawIfcItem) {
  return new IfcApplication(ifcItemsFinder, rawIfcItem);
}

export { getIfcApplication };
