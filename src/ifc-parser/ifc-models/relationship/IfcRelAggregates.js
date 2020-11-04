import { vocabulary as v } from "../../lexer/lexer.js";
import {
  resetCounter,
  getGuid,
  getExpressId,
  getIfcText,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";
import { ifcDataTypes } from "../../utils/ifc-data-types.js";

function IfcRelAggregates_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcGuid); //GlobalId
      $.SUBRULE($._IfcExpressId); //OwnerHistory
      $.SUBRULE($._IfcText); //Name
      $.SUBRULE2($._IfcText); //Description
      $.SUBRULE2($._IfcExpressId); //RelatingObject
      $.SUBRULE2($._IdSet); //RelatedObjects
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcRelAggregates_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcRelAggregates",
    Guid: { value: getGuid(parsed), type: ifcDataTypes.guid },
    OwnerHistory: { value: getExpressId(parsed), type: ifcDataTypes.id },
    Name: { value: getIfcText(parsed), type: ifcDataTypes.text },
    Description: { value: getIfcText(parsed), type: ifcDataTypes.text },
    RelatingObject: { value: getExpressId(parsed), type: ifcDataTypes.id },
    RelatingObjects: { value: getIdSet(parsed), type: ifcDataTypes.idSet },
  };
}

export { IfcRelAggregates_Parser, IfcRelAggregates_Semantic };
