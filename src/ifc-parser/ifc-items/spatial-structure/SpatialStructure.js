import { IfcProject_Parser } from "./IfcProject.js";
import { IfcSite_Parser } from "./IfcSite.js";

function addSpatialStructureParser($) {
  $.RULE("IfcProject_Parser", IfcProject_Parser($));
  $.RULE("IfcSite_Parser", IfcSite_Parser($));
}

export { addSpatialStructureParser };
