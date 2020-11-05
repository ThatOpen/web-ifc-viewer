import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcShapeRepresentation = {
  [ifcClass]: getName(t.IfcShapeRepresentation),
  ContextOfItems: d.id,
  RepresentationIdentifier: d.text,
  RepresentationType: d.text,
  Items: d.idSet,
};

export { IfcShapeRepresentation };
