import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { undefined } from "../../utils/undefined.js";

const IfcGeometricRepresentationSubContext = {
  ContextIdentifier: d.text,
  ContextType: d.text,
  [undefined]: d.asterisk,
  ParentContext: d.id,
  TargetScale: d.ifcValue,
  TargetView: d.enum,
  UserDefinedTargetView: d.text,
};

export { IfcGeometricRepresentationSubContext };
