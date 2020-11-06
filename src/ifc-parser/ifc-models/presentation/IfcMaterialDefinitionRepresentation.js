import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcMaterialDefinitionRepresentation = {
  [ifcClass]: getName(t.IfcMaterialDefinitionRepresentation),
  Name: d.text,
  Description: d.text,
  Representations: d.idSet,
  RepresentedMaterial: d.id,
};

export { IfcMaterialDefinitionRepresentation };
