import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcStyledItem = {
  [ifcClass]: getName(t.IfcStyledItem),
  Item: d.id,
  Styles: d.idSet,
  Name: d.id,
};

export { IfcStyledItem };
