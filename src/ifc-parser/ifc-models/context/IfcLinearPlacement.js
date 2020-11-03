import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
} from "../../semantic/primitiveSemantic.js";

function IfcLinearPlacement_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcExpressId); //PlacementRelTo
      $.SUBRULE2($._IfcExpressId); //PlacementMeasuredAlong
      $.SUBRULE3($._IfcExpressId); //Distance
      $.SUBRULE4($._IfcExpressId); //Orientation
      $.SUBRULE5($._IfcExpressId); //CartesianPosition
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcLinearPlacement_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcLinearPlacement",
    PlacementRelTo: { value: getExpressId(parsed), type: d.id },
    PlacementMeasuredAlong: { value: getExpressId(parsed), type: d.id },
    Distance: { value: getExpressId(parsed), type: d.id },
    Orientation: { value: getExpressId(parsed), type: d.id },
    CartesianPosition: { value: getExpressId(parsed), type: d.id },
  };
}

export { IfcLinearPlacement_Parser, IfcLinearPlacement_Semantic };
