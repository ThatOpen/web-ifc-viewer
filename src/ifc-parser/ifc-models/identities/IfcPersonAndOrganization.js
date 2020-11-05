import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcPersonAndOrganization = {
  [ifcClass]: getName(t.IfcPersonAndOrganization),
  ThePerson: d.id,
  TheOrganization: d.id,
  Roles: d.idSet,
};

export { IfcPersonAndOrganization };
