import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcGridPlacement = {
  [ifcClass]: getName(t.IfcGridPlacement),
  PlacementLocation: d.id,
  PlacementRefDirection: d.id,
};

export { IfcGridPlacement };
