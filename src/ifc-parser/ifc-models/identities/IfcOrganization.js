import { newObject } from "../../parser/parser-map.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcOrganization),
  Identification: d.text,
  Name: d.text,
  Description: d.text,
  Roles: d.idSet,
  Addresses: d.idSet,
});
