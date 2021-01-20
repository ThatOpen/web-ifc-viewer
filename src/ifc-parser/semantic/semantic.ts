import { parser } from '../parser/parser.js';
import { typesParserMap } from '../parser/parser-map.js';
import { newSemantic } from './semantic-factory.js';
import { ifcTypes as t } from '../../utils/ifc-types.js';
import { primitiveParsers } from '../parser/parser-primitives.js';
import { namedProps as n } from '../../utils/global-constants.js';
//Chevrotain requires a method per syntactical structure of the parser
//When the parser outputs a syntactical structure, the visitor
//handles it with the correspondant method using visit()
const BaseVisitor = (parser as any).getBaseCstVisitorConstructor();
class IfcVisitor extends BaseVisitor {
    validateVisitor: any;
    constructor() {
        super();
        this.validateVisitor();
    }
}
(function createPrimitiveSemantic() {
    Object.keys(primitiveParsers).forEach((e) => {
        IfcVisitor.prototype[primitiveParsers[e].name] = (parsed: any) => { };
    });
})();
(function createSemantic() {
    Object.values(typesParserMap).forEach((e) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        IfcVisitor.prototype[(e as any)[n.ifcClass]] = (parsed: any) => getSemantic(t[(e as any)[n.ifcClass]], parsed);
    });
})();
function getSemantic(ifcType: any, parsed: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const ifcItem = typesParserMap[ifcType];
    return newSemantic(parsed, ifcItem);
}
const ifcVisitor = new IfcVisitor();
export { ifcVisitor };
