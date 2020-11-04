import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcBuildingStorey = {
  Guid: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  ObjectPlacement: d.id,
  Representation: d.id,
  LongName: d.text,
  CompositionType: d.enum,
  Elevation: d.number,
};

export { IfcBuildingStorey };
