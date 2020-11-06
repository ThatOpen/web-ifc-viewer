import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import { newObject } from "../../parser/parser-map.js";

newObject({
  [ifcClass]: getName(t.IfcLinearPlacement),
  PlacementRelTo: d.id,
  PlacementMeasuredAlong: d.id,
  Distance: d.id,
  Orientation: d.id,
  CartesianPosition: d.id,
});
