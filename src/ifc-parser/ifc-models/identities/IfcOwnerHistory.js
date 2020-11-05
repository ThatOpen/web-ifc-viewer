import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcOwnerHistory = {
  [ifcClass]: getName(t.IfcOwnerHistory),
  OwningUser: d.id,
  OwningApplication: d.id,
  State: d.enum,
  ChangeAction: d.enum,
  LastModifiedDate: d.date,
  LastModifyingUser: d.id,
  LastModifyingApplication: d.id,
  CreationDate: d.date,
};

export { IfcOwnerHistory };
