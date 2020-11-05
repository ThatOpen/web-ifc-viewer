import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcExtrudedAreaSolid = {
  [ifcClass]: getName(t.IfcExtrudedAreaSolid),
  SweptArea: d.id,
  Position: d.id,
  ExtrudedDirection: d.id,
  Depth: d.number,
};

export { IfcExtrudedAreaSolid };
