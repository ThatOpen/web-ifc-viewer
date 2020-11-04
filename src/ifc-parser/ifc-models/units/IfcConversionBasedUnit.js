import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcConversionBasedUnit = {
  Dimensions: d.id,
  UnitType: d.enum,
  Name: d.text,
  ConversionFactor: d.id,
};

export { IfcConversionBasedUnit };
