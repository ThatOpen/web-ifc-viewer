import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcRelDefinesByProperties = {
  [ifcClass]: getName(t.IfcRelDefinesByProperties),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingPropertyDefinition: d.id,
};

export { IfcRelDefinesByProperties };
