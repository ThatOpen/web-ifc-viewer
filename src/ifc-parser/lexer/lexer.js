import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
const newToken = chevrotain.createToken;
const Lexer = chevrotain.Lexer;

//Tokens / vocabulary for constructing the parser primitives

const tokens = [];

const patterns = {
  [d.id]: /#\d+/,
  [d.default]: /\$/,
  [d.asterisk]: /\*/,
  [d.value]: /IFC[A-Z]+?(?=\()/,
  [d.bool]: /\.T\.|\.F\./,
  [d.enum]: /\.[A-Z0-9_]+?\./,
  [d.number]: /[0-9.E-]+/,
  [d.text]: /'.*?'(?=[\)|,])/,
  EqualSign: /=/,
  OpenPar: /\(/,
  ClosePar: /\)/,
  Semicolon: /;/,
  Comma: /\s*,\s*/,
  [d.anything]: /.+/,
};

const ingoredPatterns = {
  NewLine: /[\n\r]+/,
  WhiteSpace: /\s+/,
};

(function createTokens() {
  Object.keys(patterns).forEach((e) => {
    tokens.push(
      newToken({
        name: e,
        pattern: patterns[e],
      })
    );
  });
})();

(function createIgnoredTokens() {
  Object.keys(ingoredPatterns).forEach((e) => {
    tokens.push(
      newToken({
        name: e,
        pattern: ingoredPatterns[e],
        group: chevrotain.Lexer.SKIPPED,
      })
    );
  });
})();

const lexer = new Lexer(tokens);
const vocabulary = {};
tokens.forEach((token) => {
  vocabulary[token.name] = token;
});

export { tokens, lexer, vocabulary };
