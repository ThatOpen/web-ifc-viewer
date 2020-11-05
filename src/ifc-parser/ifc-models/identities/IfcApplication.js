import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcApplication = {
  [ifcClass]: getName(t.IfcApplication),
  ApplicationDeveloper: d.id,
  Version: d.text,
  ApplicationFullName: d.text,
  ApplicationIdentifier: d.text,
};

export { IfcApplication };
