import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcLocalPlacement = {
  [ifcClass]: getName(t.IfcLocalPlacement),
  PlacementRelTo: d.id,
  RelativePlacement: d.id,
};

export { IfcLocalPlacement };
