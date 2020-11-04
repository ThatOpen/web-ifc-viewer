import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcWallStandardCase = {
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  ObjectPlacement: d.id,
  Representation: d.id,
  Tag: d.text,
};

export { IfcWallStandardCase };
