import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcPostalAddress = {
  [ifcClass]: getName(t.IfcPostalAddress),
  Purpose: d.enum,
  Description: d.text,
  UserDefinedPurpose: d.text,
  InternalLocation: d.text,
  AddressLines: d.textSet,
  PostalBox: d.text,
  Town: d.text,
  Region: d.text,
  PostalCode: d.text,
  Country: d.text,
};

export { IfcPostalAddress };
