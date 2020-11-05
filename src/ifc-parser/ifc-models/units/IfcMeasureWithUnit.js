import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcMeasureWithUnit = {
  [ifcClass]: getName(t.IfcMeasureWithUnit),
  ValueComponent: d.ifcValue,
  UnitComponent: d.id,
};

export { IfcMeasureWithUnit };
