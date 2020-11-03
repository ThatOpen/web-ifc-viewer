import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
} from "../../semantic/primitiveSemantic.js";

function IfcAxis2Placement3D_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcExpressId); //Location
      $.SUBRULE2($._IfcExpressId); //Axis
      $.SUBRULE3($._IfcExpressId); //RefDirection
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcAxis2Placement3D_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcAxis2Placement3D",
    Location: { value: getExpressId(parsed), type: d.id },
    Axis: { value: getExpressId(parsed), type: d.id },
    RefDirection: { value: getExpressId(parsed), type: d.id },
  };
}

export { IfcAxis2Placement3D_Parser, IfcAxis2Placement3D_Semantic };
