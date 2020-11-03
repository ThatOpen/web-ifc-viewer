import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getNumberSet,
} from "../../semantic/primitiveSemantic.js";

function IfcDirection_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._NumberSet); //DirectionRations
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcDirection_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcDirection",
    DirectionRatios: { value: getNumberSet(parsed), type: d.numberSet },
  };
}

export { IfcDirection_Parser, IfcDirection_Semantic };
