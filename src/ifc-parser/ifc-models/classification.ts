import { newObject } from "../parser/parser-map.js";
import { namedProps as p } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [p.ifcClass]: getName(t.IfcClassification),
  Source: d.text,
  Edition: d.text,
  EditionDate: d.id,
  Name: d.text,
});

newObject({
  [p.ifcClass]: getName(t.IfcClassificationReference),
  Location: d.text,
  ItemReference: d.text,
  Name: d.text,
  ReferencedSource: d.id,
});
