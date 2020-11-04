import { vocabulary as v } from "../../lexer/lexer.js";
import {
  resetCounter,
  getGuid,
  getExpressId,
  getIfcText,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";
import { ifcDataTypes } from "../../utils/ifc-data-types.js";

function IfcRelContainedInSpatialStructure_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcGuid); //GlobalId
      $.SUBRULE($._IfcExpressId); //OwnerHistory
      $.SUBRULE($._IfcText); //Name
      $.SUBRULE2($._IfcText); //Description
      $.SUBRULE2($._IdSet); //RelatedElements
      $.SUBRULE2($._IfcExpressId); //RelatingStructure
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcRelContainedInSpatialStructure_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcRelContainedInSpatialStructure",
    Guid: { value: getGuid(parsed), type: ifcDataTypes.guid },
    OwnerHistory: { value: getExpressId(parsed), type: ifcDataTypes.id },
    Name: { value: getIfcText(parsed), type: ifcDataTypes.text },
    Description: { value: getIfcText(parsed), type: ifcDataTypes.text },
    RelatedElements: { value: getIdSet(parsed), type: ifcDataTypes.idSet },
    RelatingStructure: { value: getExpressId(parsed), type: ifcDataTypes.id },
  };
}

export {
  IfcRelContainedInSpatialStructure_Parser,
  IfcRelContainedInSpatialStructure_Semantic,
};
