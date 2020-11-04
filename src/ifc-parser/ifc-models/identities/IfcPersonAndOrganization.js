import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcPersonAndOrganization = {
  ThePerson: d.id,
  TheOrganization: d.id,
  Roles: d.idSet,
};

export { IfcPersonAndOrganization };
