import { tokens, vocabulary as v } from '../lexer/lexer.js';
import { addPrimitiveParsers } from './parser-primitives.js';
import { typesParserMap } from './parser-map.js';
import { newParser } from './parser-factory.js';
import { namedProps as n } from '../../utils/global-constants.js';
// import chevrotain from '../../libs/chevrotain.js';
import { CstParser } from 'chevrotain';

//Contains all the syntactical structures (RULEs)

class IfcParser extends CstParser {
  constructor() {
    super(tokens);

    addPrimitiveParsers(this);
    addParsesForAllIfcTypes(this);

    this.performSelfAnalysis();
  }
}

//Creates the syntactical structures (RULEs) for all the IFC Classes

function addParsesForAllIfcTypes($) {
  Object.values(typesParserMap).forEach((e) => {
    $.RULE(e[n.ifcClass], () => {
      newParser($, e);
    });
  });
}

const parser = new IfcParser();

export { parser };
