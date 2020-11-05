import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { undefined, ifcClass } from "../../utils/globalProperties.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcGeometricRepresentationSubContext = {
  [ifcClass]: getName(t.IfcGeometricRepresentationSubContext),
  ContextIdentifier: d.text,
  ContextType: d.text,
  [undefined]: d.asterisk,
  ParentContext: d.id,
  TargetScale: d.ifcValue,
  TargetView: d.enum,
  UserDefinedTargetView: d.text,
};

export { IfcGeometricRepresentationSubContext };
