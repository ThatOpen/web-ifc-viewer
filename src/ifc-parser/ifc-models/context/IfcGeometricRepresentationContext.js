import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
  getIfcText,
  getNumber,
} from "../../semantic/primitiveSemantic.js";

function IfcGeometricRepresentationContext_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcText); //ContextIdentifier
      $.SUBRULE2($._IfcText); //ContextType
      $.SUBRULE($._Number); //CoordinateSpaceDimension
      $.SUBRULE2($._Number); //Precision
      $.SUBRULE($._IfcExpressId); //WorldCoordinateSystem
      $.SUBRULE2($._IfcExpressId); //TrueNorth
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcGeometricRepresentationContext_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcGeometricRepresentationContext",
    ContextIdentifier: { value: getIfcText(parsed), type: d.text },
    ContextType: { value: getIfcText(parsed), type: d.text },
    CoordinateSpaceDimension: { value: getNumber(parsed), type: d.number },
    Precision: { value: getNumber(parsed), type: d.number },
    WorldCoordinateSystem: { value: getExpressId(parsed), type: d.id },
    TrueNorth: { value: getExpressId(parsed), type: d.id },
  };
}

export {
  IfcGeometricRepresentationContext_Parser,
  IfcGeometricRepresentationContext_Semantic,
};
