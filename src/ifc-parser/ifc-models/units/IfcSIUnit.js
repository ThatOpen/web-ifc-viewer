import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { resetCounter, getEnum } from "../../semantic/primitiveSemantic.js";

function IfcSIUnit_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._Asterisk); //-
      $.SUBRULE($._IfcEnum); //UnitType
      $.SUBRULE2($._IfcEnum); //Prefix
      $.SUBRULE3($._IfcEnum); //Name
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcSIUnit_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcSIUnit",
    UnitType: { value: getEnum(parsed), type: d.enum },
    Prefix: { value: getEnum(parsed), type: d.enum },
    Name: { value: getEnum(parsed), type: d.enum },
  };
}

export { IfcSIUnit_Parser, IfcSIUnit_Semantic };
