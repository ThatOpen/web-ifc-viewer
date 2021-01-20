import { vocabulary as v } from "../lexer/lexer.js";
import { primitiveParsers } from "./parser-primitives.js";
import { isDataTypeValid, getAllDataTypes, } from "../../utils/ifc-data-types.js";
//Creates a syntactical structure (RULEs) given an IFC Class
function newParser($: any, ifcItem: any) {
    resetParserFactory();
    $.CONSUME((v as any).OpenPar);
    createRulesForAllProperties($, ifcItem);
    $.CONSUME((v as any).ClosePar);
}
function createRulesForAllProperties($: any, ifcItem: any) {
    Object.values(ifcItem).forEach((dataType) => {
        if (isDataTypeValid(dataType))
            newRule($, dataType);
    });
}
function newRule($: any, dataType: any) {
    const rule = `SUBRULE${getIndex(dataType)}`;
    updateCounter(dataType);
    return $[rule]($[primitiveParsers[dataType].name]);
}
//The counter is necessary because chevrotain cannot have
//multiple identical SUBRULEs. The repeated methods need to be
//followed by a suffix (f.e. SUBRULE(X), SUBRULE2(X), ...)
let counter = {};
function resetParserFactory() {
    counter = {};
    getAllDataTypes().forEach((e) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        counter[e] = 0;
    });
}
function updateCounter(dataType: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    counter[dataType]++;
}
//Chevrotain syntax: SUBRULE0(X) is expressed as SUBRULE(X)
function getIndex(dataType: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return counter[dataType] === 0 ? "" : counter[dataType];
}
export { newParser, resetParserFactory };
