import { regexp as r } from "../ifc-utils/ifc-regexp";

function solveUnicode(text) {
  if (r.unicode.test(text)) {
    const encoded = text.match(r.unicode)[0].match(r.getUnicode)[0];
    text = text.replace(r.unicode, String.fromCharCode(parseInt(encoded, 16)));
    console.log(text);
  }
  return text;
}

export { solveUnicode };
