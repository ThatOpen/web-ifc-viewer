import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import { ifcClass } from "../../utils/globalProperties.js";

const IfcSpace = {
  [ifcClass]: getName(t.IfcSpace),
  Guid: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  ObjectPlacement: d.id,
  Representation: d.id,
  LongName: d.text,
  CompositionType: d.enum,
  InteriorOrExteriorSpace: d.enum,
  ElevationWithFlooring: d.number,
};

export { IfcSpace };
