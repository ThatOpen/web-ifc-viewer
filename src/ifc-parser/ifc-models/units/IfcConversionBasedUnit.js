import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
  getIfcText,
  getEnum,
} from "../../semantic/primitiveSemantic.js";

function IfcConversionBasedUnit_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcExpressId); //Dimensions
      $.SUBRULE($._IfcEnum); //UnitType
      $.SUBRULE($._IfcText); //Name
      $.SUBRULE2($._IfcExpressId); //ConversionFactor
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcConversionBasedUnit_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcConversionBasedUnit",
    Dimensions: { value: getExpressId(parsed), type: d.id },
    UnitType: { value: getEnum(parsed), type: d.enum },
    Name: { value: getIfcText(parsed), type: d.text },
    ConversionFactor: { value: getExpressId(parsed), type: d.id },
  };
}

export { IfcConversionBasedUnit_Parser, IfcConversionBasedUnit_Semantic };
