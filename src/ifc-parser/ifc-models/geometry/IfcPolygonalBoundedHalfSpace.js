import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcPolygonalBoundedHalfSpace = {
  [ifcClass]: getName(t.IfcPolygonalBoundedHalfSpace),
  BaseSurface: d.id,
  AgreementFlag: d.bool,
  Position: d.id,
  PolygonalBoundary: d.id,
};

export { IfcPolygonalBoundedHalfSpace };
