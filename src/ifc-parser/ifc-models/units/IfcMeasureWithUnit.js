import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
  getIfcValue,
} from "../../semantic/primitiveSemantic.js";

function IfcMeasureWithUnit_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcValue); //ValueComponent
      $.SUBRULE2($._IfcExpressId); //UnitComponent
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcMeasureWithUnit_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcMeasureWithUnit",
    ValueComponent: { value: getIfcValue(parsed), type: d.ifcValue },
    UnitComponent: { value: getExpressId(parsed), type: d.id },
  };
}

export { IfcMeasureWithUnit_Parser, IfcMeasureWithUnit_Semantic };
