import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
  getNumber,
} from "../../semantic/primitiveSemantic.js";

function IfcDerivedUnitElement_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE2($._IfcExpressId); //Unit
      $.SUBRULE($._Number); //Exponent
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcDerivedUnitElement_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcDerivedUnitElement",
    Unit: { value: getExpressId(parsed), type: d.id },
    Exponent: { value: getNumber(parsed), type: d.number },
  };
}

export { IfcDerivedUnitElement_Parser, IfcDerivedUnitElement_Semantic };
