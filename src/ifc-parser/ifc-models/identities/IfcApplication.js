import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
  getIfcText,
} from "../../semantic/primitiveSemantic.js";

function IfcApplication_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcExpressId); //ApplicationDeveloper
      $.SUBRULE($._IfcText); //Version
      $.SUBRULE2($._IfcText); //ApplicationFullName
      $.SUBRULE3($._IfcText); //ApplicationIdentifier
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcApplication_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcApplication",
    ApplicationDeveloper: { value: getExpressId(parsed), type: d.id },
    Version: { value: getIfcText(parsed), type: d.text },
    ApplicationFullName: { value: getIfcText(parsed), type: d.text },
    ApplicationIdentifier: { value: getIfcText(parsed), type: d.text },
  };
}

export { IfcApplication_Parser, IfcApplication_Semantic };
