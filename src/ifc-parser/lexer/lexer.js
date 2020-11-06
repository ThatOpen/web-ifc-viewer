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
  Text: /'.+?'(?=[\)|,])/,
  Boolean: /\.T\.|\.F\./,
  Enum: /\.[A-Z0-9_]+?\./,
  Number: /[0-9.E-]+/,
  EqualSign: /=/,
  OpenPar: /\(/,
  ClosePar: /\)/,
  Semicolon: /;/,
  Comma: /,/,
  NewLine: /[\n\r]+/,
  WhiteSpace: /\s+/,
};

function creaTokens() {
  Object.keys(patterns).forEach((e) => {
    tokens.push(
      newToken({
        name: e,
        pattern: patterns[e],
      })
    );
  });
}

creaTokens();

const lexer = new Lexer(tokens);
const vocabulary = {};
tokens.forEach((token) => {
  vocabulary[token.name] = token;
});

export { tokens, lexer, vocabulary };
