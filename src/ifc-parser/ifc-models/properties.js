import { newObject } from "../parser/parser-map.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcPropertySet),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  HasProperties: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcPropertySingleValue),
  Name: d.text,
  Description: d.text,
  NominalValue: d.ifcValue,
  Unit: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcSpaceType),
  GlobalId: d.guid,
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
  [ifcClass]: getName(t.IfcWallType),
  GlobalId: d.guid,
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
  [ifcClass]: getName(t.IfcSlabType),
  GlobalId: d.guid,
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
  [ifcClass]: getName(t.IfcDoorLiningProperties),
  GlobalId: d.guid,
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
  [ifcClass]: getName(t.IfcDoorPanelProperties),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  PanelDepth: d.number,
  PanelOperation: d.enum,
  PanelWidth: d.ifcValue,
  PanelPosition: d.enum,
  ShapeAspectStyle: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcDoorStyle),
  GlobalId: d.guid,
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
