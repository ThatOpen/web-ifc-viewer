import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

const IfcDimensionalExponents = {
  [ifcClass]: getName(t.IfcDimensionalExponents),
  LengthExponent: d.number,
  MassExponent: d.number,
  TimeExponent: d.number,
  ElectricCurrentExponent: d.number,
  ThermodynamicTemperatureExponent: d.number,
  AmountOfSubstanceExponent: d.number,
  LuminousIntensityExponent: d.number,
};

export { IfcDimensionalExponents };
