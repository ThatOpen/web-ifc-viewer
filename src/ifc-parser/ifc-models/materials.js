import { newObject } from "../parser/parser-map.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcMaterial),
  Name: d.text,
});

newObject({
  [ifcClass]: getName(t.IfcMaterialLayer),
  Material: d.id,
  LayerThickness: d.number,
  IsVentilated: d.ifcValue,
});

newObject({
  [ifcClass]: getName(t.IfcMaterialLayerSet),
  MaterialLayers: d.idSet,
  LayerSetName: d.text,
});

newObject({
  [ifcClass]: getName(t.IfcMaterialLayerSetUsage),
  ForLayerSet: d.id,
  LayerSetDirection: d.enum,
  DirectionSense: d.enum,
  OffsetFromReferenceLine: d.number,
});

newObject({
  [ifcClass]: getName(t.IfcMaterialList),
  Materials: d.idSet,
});
