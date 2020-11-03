import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getNumberSet,
} from "../../semantic/primitiveSemantic.js";

function IfcCartesianPoint_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._NumberSet); //Coordinates
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcCartesianPoint_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcCartesianPoint",
    Coordinates: { value: getNumberSet(parsed), type: d.numberSet },
  };
}

export { IfcCartesianPoint_Parser, IfcCartesianPoint_Semantic };
