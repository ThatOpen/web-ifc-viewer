import { regexp } from "./ifc-regexp";

class ParseUtils {
  getHeaderSection(rawIfcLine) {
    return rawIfcLine.match(regexp.headerSection)[0];
  }

  getDataSection(rawIfcLine) {
    return rawIfcLine.match(regexp.dataSection)[0];
  }

  getGuid(rawIfcLine) {
    return rawIfcLine.match(regexp.guid).toString().slice(1, -1);
  }

  getId(rawIfcLine) {
    return parseInt(rawIfcLine.match(regexp.expressId).toString().slice(1));
  }

  getIdSet(rawIfcLine) {
    return rawIfcLine
      .match(regexp.expressIdSet)[0]
      .toString()
      .slice(1, -1)
      .split(",")
      .map((e) => {
        e = e.replace(regexp.boundingSpaces, "");
        return parseInt(e.slice(1));
      });
  }

  getIfcType(rawIfcLine) {
    return rawIfcLine.match(regexp.rawIfcType).toString();
  }

  getIfcEnum(rawIfcLine) {
    return rawIfcLine
      .match(regexp.enum)
      .toString()
      .replace(regexp.boundingPoints, "");
  }

  getIfcNumber(rawIfcLine) {
    return Number(rawIfcLine.match(regexp.Number).toString());
  }

  getAsterisk(rawIfcLine) {
    return rawIfcLine.match(regexp.asterisk).toString();
  }

  getIfcValue(rawIfcLine) {
    return rawIfcLine.match(regexp.ifcValue)[0].toString();
  }

  getNumberSet(rawIfcLine) {
    return rawIfcLine
      .match(regexp.numberSet)
      .toString()
      .replace(regexp.boundingBrackets, "")
      .split(",")
      .map((e) => {
        return Number(e);
      });
  }

  getIfcText(rawIfcLine) {
    return rawIfcLine
      .match(regexp.text)
      .toString()
      .replace(regexp.boundingApostrophes, "");
  }

  default(ifcLine) {
    return getDefaultValue(ifcLine);
  }

  getIfcRawProperties(ifcLine) {
    return ifcLine.match(regexp.rawIfcProperties).toString().slice(1, -1);
  }

  removeAllNewLines(ifcFile) {
    return ifcFile.replace(regexp.allNewLines, " ");
  }

  separateIfcEntities(dataSection) {
    return dataSection.match(regexp.singleIfcItems);
  }

  isDefaultValue(ifcLine) {
    return isDefaultValue(ifcLine);
  }

  isAsterisk(ifcLine) {
    return regexp.asterisk.test(ifcLine);
  }

  isEmptySet(ifcLine) {
    return regexp.emptySet.test(ifcLine);
  }
}

function getDefaultValue(rawIfcLine) {
  return rawIfcLine.match(regexp.default).toString();
}

function isDefaultValue(rawIfcLine) {
  return regexp.default.test(rawIfcLine);
}

export { ParseUtils, getDefaultValue, isDefaultValue };
