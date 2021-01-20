import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [n.ifcClass]: getName(t.IfcConversionBasedUnit),
  Dimensions: d.id,
  [n.unitType]: d.enum,
  Name: d.text,
  ConversionFactor: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcDerivedUnit),
  Elements: d.idSet,
  [n.unitType]: d.enum,
  UserDefinedType: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcDerivedUnitElement),
  Unit: d.id,
  Exponent: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcDimensionalExponents),
  LengthExponent: d.number,
  MassExponent: d.number,
  TimeExponent: d.number,
  ElectricCurrentExponent: d.number,
  ThermodynamicTemperatureExponent: d.number,
  AmountOfSubstanceExponent: d.number,
  LuminousIntensityExponent: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcMeasureWithUnit),
  ValueComponent: d.value,
  UnitComponent: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcSIUnit),
  [n.undefined]: d.asterisk,
  [n.unitType]: d.enum,
  [n.prefix]: d.enum,
  Name: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcUnitAssignment),
  [n.units]: d.idSet,
});
