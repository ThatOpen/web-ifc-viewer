import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcAxis2Placement3D = {
  [ifcClass]: getName(t.IfcAxis2Placement3D),
  Location: d.id,
  Axis: d.id,
  RefDirection: d.id,
};

export { IfcAxis2Placement3D };
