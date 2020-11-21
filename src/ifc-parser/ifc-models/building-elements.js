import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [n.ifcClass]: getName(t.IfcMappedItem),
  [n.mappingSource]: d.id,
  [n.mappingTarget]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcWall),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcWallStandardCase),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcDoor),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  OverallHeight: d.number,
  OverallWidth: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcSlab),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  PredefinedType: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcOpeningElement),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcWindow),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  Tag: d.text,
  OverallHeight: d.number,
  OverallWidth: d.number,
});