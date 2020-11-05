import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcDirection = {
  [ifcClass]: getName(t.IfcDirection),
  DirectionRatios: d.numberSet,
};

export { IfcDirection };
