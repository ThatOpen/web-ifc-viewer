import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcApplication = {
  ApplicationDeveloper: d.id,
  Version: d.text,
  ApplicationFullName: d.text,
  ApplicationIdentifier: d.text,
};

export { IfcApplication };
