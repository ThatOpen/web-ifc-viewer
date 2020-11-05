import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcProject = {
  [ifcClass]: getName(t.IfcProject),
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
