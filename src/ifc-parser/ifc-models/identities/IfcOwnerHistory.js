import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcOwnerHistory = {
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
