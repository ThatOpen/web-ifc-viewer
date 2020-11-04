import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
  getIfcText,
  getNumber,
  getIfcValue,
  getEnum,
} from "../../semantic/primitiveSemantic.js";

function IfcGeometricRepresentationSubContext_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcText); //ContextIdentifier
      $.SUBRULE2($._IfcText); //ContextType
      $.SUBRULE($._Asterisk); //-
      $.SUBRULE2($._Asterisk); //-
      $.SUBRULE3($._Asterisk); //-
      $.SUBRULE4($._Asterisk); //-
      $.SUBRULE($._IfcExpressId); //ParentContext
      $.SUBRULE($._IfcValue); //TargetScale
      $.SUBRULE($._IfcEnum); //TargetView
      $.SUBRULE3($._IfcText); //UserDefinedTargetView
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcGeometricRepresentationSubContext_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcGeometricRepresentationSubContext",
    ContextIdentifier: { value: getIfcText(parsed), type: d.text },
    ContextType: { value: getIfcText(parsed), type: d.text },
    ParentContext: { value: getExpressId(parsed), type: d.id },
    TargetScale: { value: getIfcValue(parsed), type: d.ifcValue },
    TargetView: { value: getEnum(parsed), type: d.enum },
    UserDefinedTargetView: { value: getIfcText(parsed), type: d.text },
  };
}

export {
  IfcGeometricRepresentationSubContext_Parser,
  IfcGeometricRepresentationSubContext_Semantic,
};
