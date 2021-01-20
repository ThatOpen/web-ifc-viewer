import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [n.ifcClass]: getName(t.IfcGeometricRepresentationContext),
  ContextIdentifier: d.text,
  ContextType: d.text,
  CoordinateSpaceDimension: d.number,
  Precision: d.number,
  WorldCoordinateSystem: d.id,
  TrueNorth: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcGeometricRepresentationSubContext),
  ContextIdentifier: d.text,
  ContextType: d.text,
  [`${n.undefined}1`]: d.asterisk,
  [`${n.undefined}2`]: d.asterisk,
  [`${n.undefined}3`]: d.asterisk,
  [`${n.undefined}4`]: d.asterisk,
  ParentContext: d.id,
  TargetScale: d.value,
  TargetView: d.enum,
  UserDefinedTargetView: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcGridPlacement),
  PlacementLocation: d.id,
  PlacementRefDirection: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcLinearPlacement),
  PlacementRelTo: d.id,
  PlacementMeasuredAlong: d.id,
  Distance: d.id,
  Orientation: d.id,
  CartesianPosition: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcLocalPlacement),
  PlacementRelTo: d.id,
  RelativePlacement: d.id,
});
