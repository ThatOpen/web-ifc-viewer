import { parser } from "../parser/parser.js";
import { typesParserMap } from "../parser/parser-map.js";
import { newSemantic } from "./semantic-factory.js";
import { ifcTypes as t } from "../../utils/ifc-types.js";
import { primitiveParsers } from "../parser/parser-primitives.js";
import { namedProps as n } from "../../utils/global-constants.js";

//Chevrotain requires a method per syntactical structure of the parser
//When the parser outputs a syntactical structure, the visitor
//handles it with the correspondant method using visit()

const BaseVisitor = parser.getBaseCstVisitorConstructor();

class IfcVisitor extends BaseVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }
}

function createPrimitiveSemantic() {
  Object.keys(primitiveParsers).forEach((e) => {
    IfcVisitor.prototype[primitiveParsers[e].name] = (parsed) => {};
  });
}

function createSemantic() {
  Object.values(typesParserMap).forEach((e) => {
    IfcVisitor.prototype[e[n.ifcClass]] = (parsed) =>
      getSemantic(t[e[n.ifcClass]], parsed);
  });
}

function getSemantic(ifcType, parsed) {
  const ifcItem = typesParserMap[ifcType];
  return newSemantic(parsed, ifcItem);
}

createPrimitiveSemantic();
createSemantic();
const ifcVisitor = new IfcVisitor();

export { ifcVisitor };
