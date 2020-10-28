/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcutilityresource/lexical/ifcownerhistory.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseConstructor } from "../../ifc-utils/ifc-constructor";
import { getIfcApplication } from "./IfcApplication";

class IfcOwnerHistory extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.owningUser = this.extractId();
    this.owningApplication = getIfcApplication(this);
    this.state = this.extractEnum();
    this.changeAction = this.extractEnum();
    this.lastModifiedDate = this.extractNumber();
    this.lastModifiyingUser = this.extractId();
    this.lastModifyingApplication = this.extractId();
    this.creationDate = this.extractNumber();
  }
}

function getIfcOwnerHistory(caller) {
  return baseConstructor(caller, IfcOwnerHistory);
}

export { getIfcOwnerHistory };
