import { IfcApplication_Parser } from "./IfcApplication.js";
import { IfcOrganization_Parser } from "./IfcOrganization.js";
import { IfcOwnerHistory_Parser } from "./IfcOwnerHistory.js";
import { IfcPerson_Parser } from "./IfcPerson.js";
import { IfcPersonAndOrganization_Parser } from "./IfcPersonAndOrganization.js";
import { IfcPostalAddress_Parser } from "./IfcPostalAddress.js";

function addIdentitiesParsers($) {
  $.RULE("IfcOrganization_Parser", IfcOrganization_Parser($));
  $.RULE("IfcApplication_Parser", IfcApplication_Parser($));
  $.RULE("IfcOwnerHistory_Parser", IfcOwnerHistory_Parser($));
  $.RULE("IfcPerson_Parser", IfcPerson_Parser($));
  $.RULE("IfcPersonAndOrganization_Parser", IfcPersonAndOrganization_Parser($));
  $.RULE("IfcPostalAddress_Parser", IfcPostalAddress_Parser($));
}

export { addIdentitiesParsers };
