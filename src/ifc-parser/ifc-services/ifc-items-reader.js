import { itemsReaderValues as i } from "../../utils/global-constants.js";

const regexp = {
  allNewLines: /\r?\n|\r/g,
  headerSection: /HEADER;.+?(?=ENDSEC;)/,
  dataSection: /DATA;\s+.+(?=ENDSEC;)/,
  singleIfcItems: /#\d+\s*=\s*IFC.+?\)(;\s*(?=#\d*)|;\s*$)/g,
  expressId: /^#\d+/,
  rawIfcType: /IFC\w+/,
  rawIfcProperties: /\(.+?(?=;\s*$)/,
};

function readIfcItems(loadedIfc) {
  const { dataSection } = extractSections(loadedIfc);
  return constructRawIfcItems(dataSection);
}

function extractSections(loadedIfc) {
  const ifcPlaneText = removeAllNewLines(loadedIfc);
  return {
    headerSection: readHeaderSection(ifcPlaneText),
    dataSection: readDataSection(ifcPlaneText),
  };
}

function constructRawIfcItems(dataSection) {
  const flatIfcItemList = separateIfcEntities(dataSection);
  return flatIfcItemList.map((e) => {
    return {
      [i.expressId]: getId(e),
      [i.type]: getIfcType(e),
      [i.properties]: getIfcRawProperties(e),
    };
  });
}

function separateIfcEntities(dataSection) {
  return dataSection.match(regexp.singleIfcItems);
}

function readHeaderSection(ifcLine) {
  return ifcLine.match(regexp.headerSection)[0];
}

function readDataSection(ifcLine) {
  return ifcLine.match(regexp.dataSection)[0];
}

function removeAllNewLines(ifcFile) {
  return ifcFile.replace(regexp.allNewLines, " ");
}

function getId(rawIfcLine) {
  return parseInt(rawIfcLine.match(regexp.expressId).toString().slice(1));
}

function getIfcType(rawIfcLine) {
  return rawIfcLine.match(regexp.rawIfcType).toString();
}

function getIfcRawProperties(ifcLine) {
  return ifcLine.match(regexp.rawIfcProperties).toString();
}

export { readIfcItems };
