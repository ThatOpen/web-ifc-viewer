import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcPropertySingleValue = {
  [ifcClass]: getName(t.IfcPropertySingleValue),
  Name: d.text,
  Description: d.text,
  NominalValue: d.ifcValue,
  Unit: d.id,
};

export { IfcPropertySingleValue };
