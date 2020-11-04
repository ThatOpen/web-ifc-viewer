import { IfcRelAggregates_Parser } from "./IfcRelAggregates.js";
import { IfcRelContainedInSpatialStructure_Parser } from "./IfcRelContainedInSpatialStructure.js";

function addRelationshipParsers($) {
  $.RULE("IfcRelAggregates_Parser", IfcRelAggregates_Parser($));
  $.RULE(
    "IfcRelContainedInSpatialStructure_Parser",
    IfcRelContainedInSpatialStructure_Parser($)
  );
}

export { addRelationshipParsers };
