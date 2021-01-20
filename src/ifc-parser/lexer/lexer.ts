import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'chevrotain'.
const newToken = chevrotain.createToken;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'chevrotain'.
const Lexer = chevrotain.Lexer;

//Tokens / vocabulary for constructing the parser primitives

const tokens: any = [];

const patterns = {
  [d.id]: /#\d+/,
  [d.asterisk]: /\*/,
  [d.default]: /\$/,
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
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        pattern: ingoredPatterns[e],
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'chevrotain'.
        group: chevrotain.Lexer.SKIPPED,
      })
    );
  });
})();

const lexer = new Lexer(tokens);
const vocabulary = {};
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'token' implicitly has an 'any' type.
tokens.forEach((token) => {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  vocabulary[token.name] = token;
});

export { tokens, lexer, vocabulary };
