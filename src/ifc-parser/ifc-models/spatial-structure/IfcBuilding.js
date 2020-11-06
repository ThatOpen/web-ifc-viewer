import { newObject } from "../../parser/parser-map.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcBuilding),
  Guid: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  ObjectPlacement: d.id,
  Representation: d.id,
  LongName: d.text,
  CompositionType: d.enum,
  ElevationOfRefHeight: d.number,
  ElevationOfTerrain: d.number,
  BuildingAddress: d.id,
});
