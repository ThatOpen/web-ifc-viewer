import { newObject } from "../../parser/parser-map.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcRelAggregates),
  Guid: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatingObject: d.id,
  RelatingObjects: d.idSet,
});
