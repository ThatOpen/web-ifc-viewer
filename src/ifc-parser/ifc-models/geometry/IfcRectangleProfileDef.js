import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcRectangleProfileDef = {
  [ifcClass]: getName(t.IfcRectangleProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  Position: d.id,
  XDim: d.number,
  YDim: d.number,
};

export { IfcRectangleProfileDef };
