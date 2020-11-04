import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcOrganization = {
  Identification: d.text,
  Name: d.text,
  Description: d.text,
  Roles: d.idSet,
  Addresses: d.idSet,
};

export { IfcOrganization };
