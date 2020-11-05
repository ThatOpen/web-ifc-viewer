import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcProductDefinitionShape = {
  [ifcClass]: getName(t.IfcProductDefinitionShape),
  Description: d.text,
  RepresentationType: d.text,
  Representations: d.idSet,
};

export { IfcProductDefinitionShape };
