import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
} from "../../semantic/primitiveSemantic.js";

function IfcGridPlacement_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcExpressId); //PlacementLocation
      $.SUBRULE2($._IfcExpressId); //PlacementRefDirection
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcGridPlacement_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcGridPlacement",
    PlacementLocation: { value: getExpressId(parsed), type: d.id },
    PlacementRefDirection: { value: getExpressId(parsed), type: d.id },
  };
}

export { IfcGridPlacement_Parser, IfcGridPlacement_Semantic };
