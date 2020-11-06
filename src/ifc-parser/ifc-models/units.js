import { newObject } from "../parser/parser-map.js";
import { ifcClass } from "../utils/globalProperties.js";
import { ifcDataTypes as d } from "../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcConversionBasedUnit),
  Dimensions: d.id,
  UnitType: d.enum,
  Name: d.text,
  ConversionFactor: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcDerivedUnit),
  Elements: d.idSet,
  UnitType: d.enum,
  UserDefinedType: d.text,
});

newObject({
  [ifcClass]: getName(t.IfcDerivedUnitElement),
  Unit: d.id,
  Exponent: d.number,
});

newObject({
  [ifcClass]: getName(t.IfcDimensionalExponents),
  LengthExponent: d.number,
  MassExponent: d.number,
  TimeExponent: d.number,
  ElectricCurrentExponent: d.number,
  ThermodynamicTemperatureExponent: d.number,
  AmountOfSubstanceExponent: d.number,
  LuminousIntensityExponent: d.number,
});

newObject({
  [ifcClass]: getName(t.IfcMeasureWithUnit),
  ValueComponent: d.ifcValue,
  UnitComponent: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcSIUnit),
  [undefined]: d.asterisk,
  UnitType: d.enum,
  Prefix: d.enum,
  Name: d.enum,
});

newObject({
  [ifcClass]: getName(t.IfcUnitAssignment),
  Units: d.idSet,
});
