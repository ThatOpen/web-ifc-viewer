import { IfcProject_Parser } from "./IfcProject.js";

function addSpatialStructureParser($) {
  $.RULE("IfcProject_Parser", IfcProject_Parser($));
}

export { addSpatialStructureParser };
