import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcRelAggregates = {
  Guid: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatingObject: d.id,
  RelatingObjects: d.idSet,
};

export { IfcRelAggregates };
