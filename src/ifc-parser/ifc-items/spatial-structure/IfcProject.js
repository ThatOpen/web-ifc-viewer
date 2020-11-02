import { vocabulary as v } from "../../lexer/lexer.js";
import {
  getGuid,
  getExpressId,
  getIfcText,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";

function IfcProject_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.CONSUME(v.IfcGuid);
      $.CONSUME(v.Comma);
      $.SUBRULE($.IfcExpressId);
      $.CONSUME2(v.Comma);
      $.SUBRULE($.IfcText);
      $.CONSUME3(v.Comma);
      $.SUBRULE2($.IfcText);
      $.CONSUME4(v.Comma);
      $.SUBRULE3($.IfcText);
      $.CONSUME5(v.Comma);
      $.SUBRULE4($.IfcText);
      $.CONSUME6(v.Comma);
      $.SUBRULE5($.IfcText);
      $.CONSUME7(v.Comma);
      $.SUBRULE($.IdSet);
      $.CONSUME8(v.Comma);
      $.SUBRULE2($.IfcExpressId);
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcProject_Semantic(parsed) {
  return {
    IfcType: "IfcProject",
    Guid: getGuid(parsed, 0),
    OwnerHistory: getExpressId(parsed, 0),
    Name: getIfcText(parsed, 0),
    Description: getIfcText(parsed, 1),
    ObjectType: getIfcText(parsed, 2),
    LongName: getIfcText(parsed, 3),
    Phase: getIfcText(parsed, 4),
    RepresentationContexts: getIdSet(parsed, 0),
    UnitsInContext: getExpressId(parsed, 1),
  };
}

export { IfcProject_Parser, IfcProject_Semantic };
