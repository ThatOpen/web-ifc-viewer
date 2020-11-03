import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
} from "../../semantic/primitiveSemantic.js";

function IfcLocalPlacement_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcExpressId); //PlacementRelTo
      $.SUBRULE2($._IfcExpressId); //RelativePlacement
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcLocalPlacement_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcLocalPlacement",
    PlacementRelTo: { value: getExpressId(parsed), type: d.id },
    RelativePlacement: { value: getExpressId(parsed), type: d.id },
  };
}

export { IfcLocalPlacement_Parser, IfcLocalPlacement_Semantic };
