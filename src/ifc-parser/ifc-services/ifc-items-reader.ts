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

function readIfcItems(loadedIfc: any) {
  const { dataSection } = extractSections(loadedIfc);
  return constructRawIfcItems(dataSection);
}

function extractSections(loadedIfc: any) {
  const ifcPlaneText = removeAllNewLines(loadedIfc);
  return {
    headerSection: readHeaderSection(ifcPlaneText),
    dataSection: readDataSection(ifcPlaneText),
  };
}

function constructRawIfcItems(dataSection: any) {
  const flatIfcItemList = separateIfcEntities(dataSection);
  return flatIfcItemList.map((e: any) => {
    return {
      [i.expressId]: getId(e),
      [i.type]: getIfcType(e),
      [i.properties]: getIfcRawProperties(e),
    };
  });
}

function separateIfcEntities(dataSection: any) {
  return dataSection.match(regexp.singleIfcItems);
}

function readHeaderSection(ifcLine: any) {
  return ifcLine.match(regexp.headerSection)[0];
}

function readDataSection(ifcLine: any) {
  return ifcLine.match(regexp.dataSection)[0];
}

function removeAllNewLines(ifcFile: any) {
  return ifcFile.replace(regexp.allNewLines, " ");
}

function getId(rawIfcLine: any) {
  return parseInt(rawIfcLine.match(regexp.expressId).toString().slice(1));
}

function getIfcType(rawIfcLine: any) {
  return rawIfcLine.match(regexp.rawIfcType).toString();
}

function getIfcRawProperties(ifcLine: any) {
  return ifcLine.match(regexp.rawIfcProperties).toString();
}

export { readIfcItems };
