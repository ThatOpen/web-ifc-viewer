import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getGuid,
  getExpressId,
  getIfcText,
  getNumber,
  getEnum,
  getNumberSet,
  getDate,
} from "../../semantic/primitiveSemantic.js";

function IfcOwnerHistory_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcExpressId); //OwningUser
      $.SUBRULE2($._IfcExpressId); //OwningApplication
      $.SUBRULE($._IfcEnum); //State
      $.SUBRULE2($._IfcEnum); //ChangeAction
      $.SUBRULE($._Number); //LastModifiedDate
      $.SUBRULE3($._IfcExpressId); //LastModifyingUser
      $.SUBRULE4($._IfcExpressId); //LastModifyingApplication
      $.SUBRULE2($._Number); //CreationDate
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcOwnerHistory_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcOwnerHistory",
    OwningUser: { value: getExpressId(parsed), type: d.id },
    OwningApplication: { value: getExpressId(parsed), type: d.id },
    State: { value: getEnum(parsed), type: d.enum },
    ChangeAction: { value: getEnum(parsed), type: d.enum },
    LastModifiedDate: { value: getDate(parsed), type: d.date },
    LastModifyingUser: { value: getExpressId(parsed), type: d.id },
    LastModifyingApplication: { value: getExpressId(parsed), type: d.id },
    CreationDate: { value: getDate(parsed), type: d.date },
  };
}

export { IfcOwnerHistory_Parser, IfcOwnerHistory_Semantic };
