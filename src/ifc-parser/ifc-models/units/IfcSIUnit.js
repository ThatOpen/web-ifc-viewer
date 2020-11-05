import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass, undefined } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcSIUnit = {
  [ifcClass]: getName(t.IfcSIUnit),
  [undefined]: d.asterisk,
  UnitType: d.enum,
  Prefix: d.enum,
  Name: d.enum,
};

export { IfcSIUnit };
