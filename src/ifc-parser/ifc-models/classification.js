import { newObject } from "../parser/parser-map.js";
import { ifcClass } from "../utils/globalProperties.js";
import { ifcDataTypes as d } from "../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcClassification),
  Source: d.text,
  Edition: d.text,
  EditionDate: d.id,
  Name: d.text,
});
