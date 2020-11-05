import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcSite = {
  [ifcClass]: getName(t.IfcSite),
  Guid: d.guid,
  OwnerHistory: d.id,
  Name: d.text,
  Description: d.text,
  ObjectType: d.text,
  ObjectPlacement: d.id,
  Representation: d.id,
  LongName: d.text,
  CompositionType: d.enum,
  RefLatitude: d.numberSet,
  RefLongitude: d.numberSet,
  RefElevation: d.number,
  LandTitleNumber: d.text,
  SiteAddress: d.id,
};

export { IfcSite };
