import { newObject } from '../parser/parser-map.js';
import { namedProps as n } from '../../utils/global-constants.js';
import { ifcDataTypes as d } from '../../utils/ifc-data-types.js';
import { getName, ifcTypes as t } from '../../utils/ifc-types.js';

newObject({
  [n.ifcClass]: getName(t.IfcMappedItem),
  [n.mappingSource]: d.id,
  [n.mappingTarget]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcWall),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcBeam),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcFooting),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  PredefinedType: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcWallStandardCase),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcCurtainWall),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcDoor),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  OverallHeight: d.number,
  OverallWidth: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcRailing),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  PredefinedType: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcPlate),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcMember),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcSlab),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  PredefinedType: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcOpeningElement),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcWindow),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  OverallHeight: d.number,
  OverallWidth: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcStair),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  ShapeType: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcRoof),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  ShapeType: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcColumn),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcStairFlight),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  NumberOfRiser: d.number,
  NumberOfThreads: d.number,
  RiserHeight: d.number,
  TreadLength: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcFlowTerminal),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcFlowSegment),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcFurnishingElement),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcCovering),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  PredefinedType: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcBuildingElementProxy),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  CompositionType: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcEquipmentElement),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcAnnotation),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcRamp),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  ShapeType: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcReinforcingBar),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  SteelGrade: d.text,
  NominalDiameter: d.number,
  CrossSectionArea: d.number,
  BarLength: d.number,
  BarRole: d.enum,
  BarSurface: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcReinforcingMesh),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  SteelGrade: d.text,
  MeshLength: d.number,
  MeshWidth: d.number,
  LongitudinalBarNominalDiameter: d.number,
  TransverseBarNominalDiameter: d.number,
  LongitudinalBarCrossSectionArea: d.number,
  TransverseBarCrossSectionArea: d.number,
  LongitudinalBarSpacing: d.number,
  TransverseBarSpacing: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcElementAssembly),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  AssemblyPlace: d.enum,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcMechanicalFastener),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  NominalDiameter: d.number,
  NominalLength: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcFastener),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
});