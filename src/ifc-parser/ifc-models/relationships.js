import { newObject } from "../parser/parser-map.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import {
  ifcClass,
  relatedObjects,
  relatingObject,
} from "../../utils/globalProperties.js";

newObject({
  [ifcClass]: getName(t.IfcRelAggregates),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  [relatingObject]: d.id,
  [relatedObjects]: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcRelDefinesByProperties),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingPropertyDefinition: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcRelContainedInSpatialStructure),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedElements: d.idSet,
  RelatingStructure: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcRelAssociatesMaterial),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingMaterial: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcRelDefinesByType),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatedObjects: d.idSet,
  RelatingType: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcRelSpaceBoundary),
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
  [ifcClass]: getName(t.IfcRelConnectsPathElements),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ConnectionGeometry: d.id,
  RelatingElement: d.id,
  RelatedElement: d.id,
  RelatingPriorities: d.numberSet,
  RelatedPriorities: d.numberSet,
  RelatedConnectionType: d.enum,
  RelatingConnectionType: d.enum,
});

newObject({
  [ifcClass]: getName(t.IfcRelVoidsElement),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatingBuildingElement: d.id,
  RelatedOpeningElement: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcRelFillsElement),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  RelatingOpeningElement: d.id,
  RelatedBuildingElement: d.id,
});
