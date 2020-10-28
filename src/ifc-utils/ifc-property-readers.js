import { regexp } from "./ifc-regexp";

const IdReader = {
  filter: regexp.expressId,
  read: (ifcLine) => {
    return parseInt(ifcLine.match(regexp.expressId).toString().slice(1));
  },
};

const IdSetReader = {
  filter: regexp.expressIdSet,
  read: (ifcLine) => {
    return ifcLine
      .match(regexp.expressIdSet)[0]
      .toString()
      .slice(1, -1)
      .split(",")
      .map((e) => {
        e = e.replace(regexp.boundingSpaces, "");
        return parseInt(e.slice(1));
      });
  },
};

const GuidReader = {
  filter: regexp.guid,
  read: (ifcLine) => {
    return ifcLine.match(regexp.guid).toString().slice(1, -1);
  },
};

const TextReader = {
  filter: regexp.text,
  read: (ifcLine) => {
    return ifcLine
      .match(regexp.text)
      .toString()
      .replace(regexp.boundingApostrophes, "");
  },
};

const EnumReader = {
  filter: regexp.enum,
  read: (ifcLine) => {
    return ifcLine
      .match(regexp.enum)
      .toString()
      .replace(regexp.boundingPoints, "");
  },
};

const NumberReader = {
  filter: regexp.Number,
  read: (ifcLine) => {
    return Number(ifcLine.match(regexp.Number).toString());
  },
};

const IfcValueReader = {
  filter: regexp.ifcValue,
  read: (ifcLine) => {
    return ifcLine.match(regexp.ifcValue)[0].toString();
  },
};

const numberSetReader = {
  filter: regexp.numberSet,
  read: (ifcLine) => {
    return ifcLine
      .match(regexp.numberSet)
      .toString()
      .replace(regexp.boundingBrackets, "")
      .split(",")
      .map((e) => {
        return Number(e);
      });
  },
};

const defaultValueReader = {
  filter: regexp.default,
  read: (ifcLine) => {
    return ifcLine.match(regexp.default).toString();
  },
};

const asteriskReader = {
  filter: regexp.asterisk,
  read: (ifcLine) => {
    return ifcLine.match(regexp.asterisk).toString();
  },
};

const emptySetReader = {
  filter: regexp.emptySet,
  read: (ifcLine) => {
    return ifcLine.match(regexp.emptySet).toString();
  },
};

export {
  IdReader,
  IdSetReader,
  GuidReader,
  TextReader,
  NumberReader,
  IfcValueReader,
  defaultValueReader,
  asteriskReader,
  emptySetReader,
  EnumReader,
  numberSetReader,
};
