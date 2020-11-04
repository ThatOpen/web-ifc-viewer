import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcProject = {
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  LongName: d.text,
  Phase: d.text,
  RepresentationContexts: d.idSet,
  UnitsInContext: d.id,
};

export { IfcProject };
