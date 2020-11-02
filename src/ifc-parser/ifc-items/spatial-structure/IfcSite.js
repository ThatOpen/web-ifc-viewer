import { vocabulary as v } from "../../lexer/lexer.js";
import {
  resetCounter,
  getGuid,
  getExpressId,
  getIfcText,
  getNumber,
  getEnum,
  getNumberSet,
} from "../../semantic/primitiveSemantic.js";

function IfcSite_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($.IfcGuid_Primitive); //GlobalId
      $.SUBRULE($.IfcExpressId_Primitive); //OwnerHistory
      $.SUBRULE($.IfcText_Primitive); //Name
      $.SUBRULE2($.IfcText_Primitive); //Description
      $.SUBRULE3($.IfcText_Primitive); //ObjectType
      $.SUBRULE2($.IfcExpressId_Primitive); //ObjectPlacement
      $.SUBRULE3($.IfcExpressId_Primitive); //Representation
      $.SUBRULE4($.IfcText_Primitive); //LongName
      $.SUBRULE2($.IfcEnum_Primitive); //CompositionType
      $.SUBRULE($.NumberSet_Primitive); //RefLatitude
      $.SUBRULE2($.NumberSet_Primitive); //RefLongitude
      $.SUBRULE2($.Number_Primitive); //RefElevation
      $.SUBRULE5($.IfcText_Primitive); //LandNumber
      $.SUBRULE4($.IfcExpressId_Primitive); //IfcPostalAddress
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcSite_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcSite",
    Guid: getGuid(parsed),
    OwnerHistory: getExpressId(parsed),
    Name: getIfcText(parsed),
    Description: getIfcText(parsed),
    ObjectType: getIfcText(parsed),
    ObjectPlacement: getExpressId(parsed),
    Representation: getExpressId(parsed),
    LongName: getIfcText(parsed),
    CompositionType: getEnum(parsed),
    RefLatitude: getNumberSet(parsed),
    RefLongitude: getNumberSet(parsed),
    RefElevation: getNumber(parsed),
    LandNumber: getIfcText(parsed),
    PostalAddress: getExpressId(parsed),
  };
}

export { IfcSite_Parser, IfcSite_Semantic };
