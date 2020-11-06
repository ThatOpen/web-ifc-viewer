import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcPresentationStyleAssignment = {
  [ifcClass]: getName(t.IfcPresentationStyleAssignment),
  Styles: d.idSet,
};

export { IfcPresentationStyleAssignment };
