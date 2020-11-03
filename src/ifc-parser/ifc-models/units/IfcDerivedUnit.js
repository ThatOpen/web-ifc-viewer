import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getIfcText,
  getEnum,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";

function IfcDerivedUnit_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IdSet); //Elements
      $.SUBRULE($._IfcEnum); //UnitType
      $.SUBRULE($._IfcText); //UserDefinedType
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcDerivedUnit_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcDerivedUnit",
    Elements: { value: getIdSet(parsed), type: d.idSet },
    UnitType: { value: getEnum(parsed), type: d.enum },
    UserDefinedType: { value: getIfcText(parsed), type: d.text },
  };
}

export { IfcDerivedUnit_Parser, IfcDerivedUnit_Semantic };
