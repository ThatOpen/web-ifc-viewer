import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcPerson = {
  [ifcClass]: getName(t.IfcPerson),
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
