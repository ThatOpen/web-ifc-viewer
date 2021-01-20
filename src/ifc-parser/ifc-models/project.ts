import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
    [n.ifcClass]: getName(t.IfcActor),
    GlobalId: d.text,
    OwnerHistory: d.id,
    Name: d.text,
    Description: d.text,
    ObjectType: d.text,
    TheActor: d.id,
  });