import { IfcProject_Parser } from "./IfcProject.js";
import { IfcSite_Parser } from "./IfcSite.js";
import { IfcBuilding_Parser } from "./IfcBuilding.js";
import { IfcBuildingStorey_Parser } from "./IfcBuildingStorey.js";
import { IfcSpace_Parser } from "./IfcSpace.js";

function addSpatialStructureParser($) {
  $.RULE("IfcProject_Parser", IfcProject_Parser($));
  $.RULE("IfcSite_Parser", IfcSite_Parser($));
  $.RULE("IfcBuilding_Parser", IfcBuilding_Parser($));
  $.RULE("IfcBuildingStorey_Parser", IfcBuildingStorey_Parser($));
  $.RULE("IfcSpace_Parser", IfcSpace_Parser($));
}

export { addSpatialStructureParser };
