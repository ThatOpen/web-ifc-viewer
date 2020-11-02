import { vocabulary as v } from "../../lexer/lexer.js";
import {
  resetCounter,
  getGuid,
  getExpressId,
  getIfcText,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";

function IfcProject_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($.IfcGuid_Primitive); //GlobalId
      $.SUBRULE($.IfcExpressId_Primitive); //OwnerHistory
      $.SUBRULE($.IfcText_Primitive); //Name
      $.SUBRULE2($.IfcText_Primitive); //Description
      $.SUBRULE3($.IfcText_Primitive); //ObjectType
      $.SUBRULE4($.IfcText_Primitive); //LongName
      $.SUBRULE5($.IfcText_Primitive); //Phase
      $.SUBRULE($.IdSet_Primitive); //RepresentationContexts
      $.SUBRULE2($.IfcExpressId_Primitive); //UnitsInContext
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcProject_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcProject",
    Guid: getGuid(parsed),
    OwnerHistory: getExpressId(parsed),
    Name: getIfcText(parsed),
    Description: getIfcText(parsed),
    ObjectType: getIfcText(parsed),
    LongName: getIfcText(parsed),
    Phase: getIfcText(parsed),
    RepresentationContexts: getIdSet(parsed),
    UnitsInContext: getExpressId(parsed),
  };
}

export { IfcProject_Parser, IfcProject_Semantic };
