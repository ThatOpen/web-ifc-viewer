import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcDerivedUnitElement = {
  [ifcClass]: getName(t.IfcDerivedUnitElement),
  Unit: d.id,
  Exponent: d.number,
};

export { IfcDerivedUnitElement };
