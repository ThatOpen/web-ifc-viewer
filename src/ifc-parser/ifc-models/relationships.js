import { newObject } from "../parser/parser-map.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import { namedProps as n } from "../../utils/global-constants.js";

newObject({
  [n.ifcClass]: getName(t.IfcRelAggregates),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  [n.relatingObject]: d.id,
  [n.relatedObjects]: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelContainedInSpatialStructure),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  [n.relatedElements]: d.idSet,
  [n.relatingStructure]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelDefinesByProperties),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingPropertyDefinition: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelAssociatesMaterial),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingMaterial: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelDefinesByType),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingType: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelSpaceBoundary),
  GlobalId: d.guid,
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
  GlobalId: d.guid,
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
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  [n.relatingBuildingElement]: d.id,
  [n.relatedOpeningElement]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcRelFillsElement),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatingOpeningElement: d.id,
  RelatedBuildingElement: d.id,
});
