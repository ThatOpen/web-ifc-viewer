import { typeValue as v } from "../utils/global-constants.js";

function bindElements(finder, type, relating, related, property) {
  const relations = finder.findByType(type);
  Object.values(relations).forEach((relation) => {
    return isArray(relation[relating][v.value])
      ? bindMultiple(relation, relating, related, property)
      : bindSingle(relation, relating, related, property);
  });
}

function bindSingle(relation, relating, related, property) {
  if (!relation[relating][v.value][property])
    relation[relating][v.value][property] = [];
  bind(relation[relating][v.value][property], relation, related);
}

function bindMultiple(relation, relating, related, property) {
  relation[relating][v.value].forEach((e) => {
    if (!e[property]) e[property] = [];
    bind(e[property], relation, related);
  });
}

function bind(property, relation, related) {
  return isArray(relation[related][v.value])
    ? property.push(...relation[related][v.value])
    : property.push(relation[related][v.value]);
}

function isArray(item) {
  return item.constructor === Array;
}

export { bindElements };
