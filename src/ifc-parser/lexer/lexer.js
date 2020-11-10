import "../../../node_modules/chevrotain/lib/chevrotain.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
const newToken = chevrotain.createToken;
const Lexer = chevrotain.Lexer;

//Tokens / vocabulary for constructing the parser primitives

const tokens = [];

const patterns = {
  [d.id]: /#\d+/,
  [d.guid]: /'[a-zA-Z0-9_$]{22}'(?=[\)|,])/,
  [d.asterisk]: /\*/,
  [d.default]: /\$/,
  [d.emptyText]: /''(?=[\)|,])/,
  [d.value]: /IFC[A-Z]+?(?=\()/,
  [d.bool]: /\.T\.|\.F\./,
  [d.enum]: /\.[A-Z0-9_]+?\./,
  [d.number]: /[0-9.E-]+/,
  [d.text]: /'.+?'(?=[\)|,])/,
  EqualSign: /=/,
  OpenPar: /\(/,
  ClosePar: /\)/,
  Semicolon: /;/,
  Comma: /,/,
};

const ingoredPatterns = {
  NewLine: /[\n\r]+/,
  WhiteSpace: /\s+/,
};

function createTokens() {
  Object.keys(patterns).forEach((e) => {
    tokens.push(
      newToken({
        name: e,
        pattern: patterns[e],
      })
    );
  });
}

function createIgnoredTokens() {
  Object.keys(ingoredPatterns).forEach((e) => {
    tokens.push(
      newToken({
        name: e,
        pattern: ingoredPatterns[e],
        group: chevrotain.Lexer.SKIPPED,
      })
    );
  });
}

createTokens();
createIgnoredTokens();

const lexer = new Lexer(tokens);
const vocabulary = {};
tokens.forEach((token) => {
  vocabulary[token.name] = token;
});

export { tokens, lexer, vocabulary };
