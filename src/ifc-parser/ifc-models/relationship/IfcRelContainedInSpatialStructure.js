import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcRelContainedInSpatialStructure = {
  Guid: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedElements: d.idSet,
  RelatingStructure: d.id,
};

export { IfcRelContainedInSpatialStructure };
