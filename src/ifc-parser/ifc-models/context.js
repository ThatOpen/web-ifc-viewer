import { newObject } from "../parser/parser-map.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcGeometricRepresentationContext),
  ContextIdentifier: d.text,
  ContextType: d.text,
  CoordinateSpaceDimension: d.number,
  Precision: d.number,
  WorldCoordinateSystem: d.id,
  TrueNorth: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcGeometricRepresentationSubContext),
  ContextIdentifier: d.text,
  ContextType: d.text,
  [undefined]: d.asterisk,
  ParentContext: d.id,
  TargetScale: d.ifcValue,
  TargetView: d.enum,
  UserDefinedTargetView: d.text,
});

newObject({
  [ifcClass]: getName(t.IfcGridPlacement),
  PlacementLocation: d.id,
  PlacementRefDirection: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcLinearPlacement),
  PlacementRelTo: d.id,
  PlacementMeasuredAlong: d.id,
  Distance: d.id,
  Orientation: d.id,
  CartesianPosition: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcLocalPlacement),
  PlacementRelTo: d.id,
  RelativePlacement: d.id,
});
