import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getNumberSet,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";

function IfcUnitAssignment_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IdSet); //Units
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcUnitAssignment_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcUnitAssignment",
    Units: { value: getIdSet(parsed), type: d.idSet },
  };
}

export { IfcUnitAssignment_Parser, IfcUnitAssignment_Semantic };
