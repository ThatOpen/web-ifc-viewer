import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { undefined } from "../../utils/undefined.js";

const IfcSIUnit = {
  [undefined]: d.asterisk,
  UnitType: d.enum,
  Prefix: d.enum,
  Name: d.enum,
};

export { IfcSIUnit };
