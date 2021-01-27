import { newObject } from "../parser/parser-map.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import { namedProps as n } from "../../utils/global-constants.js";

newObject({
  [n.ifcClass]: getName(t.IfcRelAggregates),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  [n.relatingObject]: d.id,
  [n.relatedObjects]: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelContainedInSpatialStructure),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  [n.relatedElements]: d.idSet,
  [n.relatingStructure]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelDefinesByProperties),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingPropertyDefinition: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelAssociatesMaterial),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingMaterial: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelAssociatesClassification),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingClassification: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelDefinesByType),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  [n.relatedObjects]: d.idSet,
  [n.relatingType]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelSpaceBoundary),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatingSpace: d.id,
  RelatedBuildingElement: d.id,
  ConnectionGeometry: d.id,
  PhysicalOrVirtualBoundary: d.enum,
  InternalOrExternalBoundary: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelConnectsPathElements),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ConnectionGeometry: d.id,
  RelatingElement: d.id,
  RelatedElement: d.id,
  RelatingPriorities: d.numSet,
  RelatedPriorities: d.numSet,
  RelatedConnectionType: d.enum,
  RelatingConnectionType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelVoidsElement),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  [n.relatingBuildingElement]: d.id,
  [n.relatedOpeningElement]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelFillsElement),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  [n.relatingOpeningElement]: d.id,
  [n.relatedBuildingElement]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelConnectsPortToElement),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatingPort: d.id,
  RelatedElement: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelAssignsToGroup),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatedObjectsType : d.enum,
  RelatingGroup : d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelServicesBuildings),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatingSystem : d.id,
  RelatedBuildings: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcGroup),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelAssignsToActor),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects : d.idSet,
  RelatedObjectsType: d.enum,
  RelatingActor: d.id,
  ActingRole: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelAssociatesDocument),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects : d.idSet,
  RelatingDocument: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelConnectsWithRealizingElements),
  GlobalId: d.text,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ConnectionGeometry : d.idSet,
  RelatingElement: d.id,
  RelatedElement: d.id,
  RealizingElements: d.idSet,
  ConnectionType: d.text,
});