import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { resetCounter, getNumber } from "../../semantic/primitiveSemantic.js";

function IfcDimensionalExponents_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._Number); //LengthExponent
      $.SUBRULE2($._Number); //MassExponent
      $.SUBRULE3($._Number); //TimeExponent
      $.SUBRULE4($._Number); //ElectricCurrentExponent
      $.SUBRULE5($._Number); //ThermodynamicTemperatureExponent
      $.SUBRULE6($._Number); //AmountOfSubstanceExponent
      $.SUBRULE7($._Number); //LuminousIntensityExponent
      $.CONSUME8(v.ClosePar);
    });
  };
}

function IfcDimensionalExponents_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcDimensionalExponents",
    LengthExponent: { value: getNumber(parsed), type: d.number },
    MassExponent: { value: getNumber(parsed), type: d.number },
    TimeExponent: { value: getNumber(parsed), type: d.number },
    ElectricCurrentExponent: { value: getNumber(parsed), type: d.number },
    ThermodynamicTemperatureExponent: {
      value: getNumber(parsed),
      type: d.number,
    },
    AmountOfSubstanceExponent: { value: getNumber(parsed), type: d.number },
    LuminousIntensityExponent: { value: getNumber(parsed), type: d.number },
  };
}

export { IfcDimensionalExponents_Parser, IfcDimensionalExponents_Semantic };
