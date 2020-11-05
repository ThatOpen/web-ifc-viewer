import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcAxis2Placement2D = {
  [ifcClass]: getName(t.IfcAxis2Placement2D),
  Location: d.id,
  RefDirection: d.id,
};

export { IfcAxis2Placement2D };
