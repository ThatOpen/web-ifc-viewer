import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcMaterialLayer = {
  [ifcClass]: getName(t.IfcMaterialLayer),
  Material: d.id,
  LayerThickness: d.number,
  IsVentilated: d.ifcValue,
};

export { IfcMaterialLayer };
