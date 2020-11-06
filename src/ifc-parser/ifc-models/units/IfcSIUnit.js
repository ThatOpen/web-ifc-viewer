import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass, undefined } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import { newObject } from "../../parser/parser-map.js";

newObject({
  [ifcClass]: getName(t.IfcSIUnit),
  [undefined]: d.asterisk,
  UnitType: d.enum,
  Prefix: d.enum,
  Name: d.enum,
});
