import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [n.ifcClass]: getName(t.IfcProject),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  LongName: d.text,
  Phase: d.text,
  RepresentationContexts: d.idSet,
  UnitsInContext: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcSite),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  LongName: d.text,
  CompositionType: d.enum,
  RefLatitude: d.numSet,
  RefLongitude: d.numSet,
  RefElevation: d.number,
  LandTitleNumber: d.text,
  SiteAddress: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcBuilding),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  LongName: d.text,
  CompositionType: d.enum,
  ElevationOfRefHeight: d.number,
  ElevationOfTerrain: d.number,
  BuildingAddress: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcBuildingStorey),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  LongName: d.text,
  CompositionType: d.enum,
  Elevation: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcSpace),
  GlobalId: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  [n.objectPlacement]: d.id,
  [n.representation]: d.id,
  LongName: d.text,
  CompositionType: d.enum,
  InteriorOrExteriorSpace: d.enum,
  ElevationWithFlooring: d.number,
});
