import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [n.ifcClass]: getName(t.IfcPropertySet),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  HasProperties: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcPropertySingleValue),
  Name: d.text,
  Description: d.text,
  NominalValue: d.value,
  Unit: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcPropertyEnumeratedValue),
  Name: d.text,
  Description: d.text,
  EnumerationValues: d.valueSet,
  EnumerationReference: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcSpaceType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcColumnType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcPlateType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcMemberType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcWallType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcStairFlightType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcDuctSegmentType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcRailingType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcCoveringType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcCurtainWallType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcFurnitureType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  AssemblyPlace: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcDoorType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
  OperationType: d.enum,
  ParameterTakesPrecedence: d.bool,
  UserDefinedOperationType: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcPipeSegmentType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcBeamType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcSlabType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcBuildingElementProxyType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcSanitaryTerminalType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcAirTerminalType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcLightFixtureType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcSystemFurnitureElementType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcDistributionElementType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcDuctFittingType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcPipeFittingType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcFireSuppressionTerminalType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcCableCarrierSegmentType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcCableCarrierFittingType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ElementType: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcDoorLiningProperties),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  LiningDepth: d.number,
  LiningThickness: d.number,
  ThresholdDepth: d.number,
  ThresholdThickness: d.number,
  TransomThickness: d.number,
  TransomOffset: d.number,
  LiningOffset: d.number,
  ThresholdOffset: d.number,
  CasingThickness: d.number,
  CasingDepth: d.number,
  ShapeAspectStyle: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcDoorPanelProperties),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  PanelDepth: d.number,
  PanelOperation: d.enum,
  PanelWidth: d.value,
  PanelPosition: d.enum,
  ShapeAspectStyle: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcDoorStyle),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  OperationType: d.enum,
  ConstructionType: d.enum,
  ParameterTakesPrecedence: d.bool,
  Sizeable: d.bool,
});

newObject({
  [n.ifcClass]: getName(t.IfcWindowStyle),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ApplicableOccurrence: d.text,
  HasPropertySets: d.idSet,
  RepresentationMaps: d.idSet,
  Tag: d.text,
  ConstructionType: d.enum,
  OperationType: d.enum,
  ParameterTakesPrecedence: d.bool,
  Sizeable: d.bool,
});

newObject({
  [n.ifcClass]: getName(t.IfcWindowLiningProperties),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  LiningDepth: d.number,
  LiningThickness: d.number,
  TransomThickness: d.number,
  MullionThickness: d.number,
  FirstTransomOffset: d.number,
  SecondTransomOffset: d.number,
  FirstMullionOffset: d.number,
  SecondMullionOffset: d.number,
  ShapeAspectStyle: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcWindowPanelProperties),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  OperationType: d.enum,
  PanelPosition: d.enum,
  FrameDepth: d.number,
  FrameThickness: d.number,
  ShapeAspectStyle: d.id,
});