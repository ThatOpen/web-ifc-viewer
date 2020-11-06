import { newObject } from "../../parser/parser-map.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes } from "../../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(ifcTypes.IfcDerivedUnit),
  Elements: d.idSet,
  UnitType: d.enum,
  UserDefinedType: d.text,
});
