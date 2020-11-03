import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getNumberSet,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";

function IfcPolyline_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IdSet); //Points
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcPolyline_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcPolyline",
    Points: { value: getIdSet(parsed), type: d.idSet },
  };
}

export { IfcPolyline_Parser, IfcPolyline_Semantic };
