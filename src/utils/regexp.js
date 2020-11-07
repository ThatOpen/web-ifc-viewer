const regexp = {
  allNewLines: /\r?\n|\r/g,
  headerSection: /HEADER;.+?(?=ENDSEC;)/,
  dataSection: /DATA;\s+.+(?=ENDSEC;)/,
  singleIfcItems: /#\d+\s*=\s*IFC.+?\);\s*/g,
  expressId: /^#\d+/,
  rawIfcType: /IFC\w+/,
  rawIfcProperties: /\(.+?(?=;)/,
  unicode: /\\X2\\[0-9A-F]+?\\X\d\\/,
  getUnicode: /[0-9A-F]+(?=\\X\d\\)/,
};

export { regexp };
