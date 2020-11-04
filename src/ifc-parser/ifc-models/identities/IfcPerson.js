import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcPerson = {
  Identification: d.text,
  FamilyName: d.text,
  GivenName: d.text,
  MiddleNames: d.textSet,
  PrefixTitles: d.textSet,
  SuffixTitles: d.textSet,
  Roles: d.idSet,
  Addresses: d.idSet,
};

export { IfcPerson };
