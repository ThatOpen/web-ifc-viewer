import { IfcProject_Parser } from "./IfcProject.js";
import { IfcSite_Parser } from "./IfcSite.js";
import { IfcBuilding_Parser } from "./IfcBuilding.js";

function addSpatialStructureParser($) {
  $.RULE("IfcProject_Parser", IfcProject_Parser($));
  $.RULE("IfcSite_Parser", IfcSite_Parser($));
  $.RULE("IfcBuilding_Parser", IfcBuilding_Parser($));
}

export { addSpatialStructureParser };
