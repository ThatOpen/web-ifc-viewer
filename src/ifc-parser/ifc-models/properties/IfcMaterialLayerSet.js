import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcMaterialLayerSet = {
  [ifcClass]: getName(t.IfcMaterialLayerSet),
  MaterialLayers: d.idSet,
  LayerSetName: d.text,
};

export { IfcMaterialLayerSet };
