import { vocabulary as v } from "../../lexer/lexer.js";
import {
  resetCounter,
  getGuid,
  getExpressId,
  getIfcText,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";
import { ifcDataTypes } from "../../utils/ifc-data-types.js";

function IfcProject_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcGuid); //GlobalId
      $.SUBRULE($._IfcExpressId); //OwnerHistory
      $.SUBRULE($._IfcText); //Name
      $.SUBRULE2($._IfcText); //Description
      $.SUBRULE3($._IfcText); //ObjectType
      $.SUBRULE4($._IfcText); //LongName
      $.SUBRULE5($._IfcText); //Phase
      $.SUBRULE($._IdSet); //RepresentationContexts
      $.SUBRULE2($._IfcExpressId); //UnitsInContext
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcProject_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcProject",
    Guid: { value: getGuid(parsed), type: ifcDataTypes.guid },
    OwnerHistory: { value: getExpressId(parsed), type: ifcDataTypes.id },
    Name: { value: getIfcText(parsed), type: ifcDataTypes.text },
    Description: { value: getIfcText(parsed), type: ifcDataTypes.text },
    ObjectType: { value: getIfcText(parsed), type: ifcDataTypes.text },
    LongName: { value: getIfcText(parsed), type: ifcDataTypes.text },
    Phase: { value: getIfcText(parsed), type: ifcDataTypes.text },
    RepresentationContexts: {
      value: getIdSet(parsed),
      type: ifcDataTypes.idSet,
    },
    UnitsInContext: { value: getExpressId(parsed), type: ifcDataTypes.id },
  };
}

export { IfcProject_Parser, IfcProject_Semantic };
