import "../../../node_modules/chevrotain/lib/chevrotain.js";
const newToken = chevrotain.createToken;
const Lexer = chevrotain.Lexer;

//Tokens / vocabulary for constructing the parser primitives

const tokens = [];

const patterns = {
  ExpressId: /#\d+/,
  IfcGuid: /'[a-zA-Z0-9_$]{22}'(?=[\)|,])/,
  Asterisk: /\*/,
  DefaultValue: /\$/,
  EmptyText: /''(?=[\)|,])/,
  IfcValue: /IFC[A-Z]+?(?=\()/,
  Boolean: /\.T\.|\.F\./,
  Enum: /\.[A-Z0-9_]+?\./,
  Number: /[0-9.E-]+/,
  Text: /'.+?'(?=[\)|,])/,
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
