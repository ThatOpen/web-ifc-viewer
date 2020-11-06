import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import { newObject } from "../../parser/parser-map.js";

newObject({
  [ifcClass]: getName(t.IfcSpaceType),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});
