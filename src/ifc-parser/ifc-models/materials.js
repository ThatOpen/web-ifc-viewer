import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [n.ifcClass]: getName(t.IfcMaterial),
  Name: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcMaterialLayer),
  Material: d.id,
  LayerThickness: d.number,
  IsVentilated: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcMaterialLayerSet),
  MaterialLayers: d.idSet,
  LayerSetName: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcMaterialLayerSetUsage),
  ForLayerSet: d.id,
  LayerSetDirection: d.enum,
  DirectionSense: d.enum,
  OffsetFromReferenceLine: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcMaterialList),
  Materials: d.idSet,
});
