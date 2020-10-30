import { ifcTypes as t } from "../../ifc-utils/ifc-types";
import { getIfcLocalPlacement } from "./IfcLocalPlacement";
import { getIfcLinearPlacement } from "./IfcLinearPlacement";
import { getIfcGridPlacement } from "./IfcGridPlacement";

function getIfcObjectPlacement(caller) {
  const ifcLine = caller.extractId();
  if (ifcLine.type === t.ifcGridPlacement)
    return getIfcGridPlacement(caller, ifcLine);
  if (ifcLine.type === t.ifcLinearPlacement)
    return getIfcLinearPlacement(caller, ifcLine);
  if (ifcLine.type === t.ifcLocalPlacement)
    return getIfcLocalPlacement(caller, ifcLine);
  return ifcLine;
}

export { getIfcObjectPlacement };
