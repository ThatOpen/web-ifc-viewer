import {
  defaultValue as def,
  namedProps as n,
  structuredData as s,
  typeValue as t,
} from "../utils/global-constants.js";

function getTransformations(structured) {
  structured[s.products].forEach((e) => {
    const transformation = { locations: [], x: [], z: [] };
    getTransformation(e[n.objectPlacement][t.value], transformation);
    e[n.transform] = transformation;
  });
}

function getTransformation(objPlacement, transformation) {
  const relPlacement = objPlacement[n.relativePlacement][t.value];
  transformation.locations.push(getLocation(relPlacement));
  transformation.x.push(getAxisX(relPlacement));
  transformation.z.push(getAxisZ(relPlacement));
  if (objPlacement[n.placementRelTo][t.value] != def) {
    getTransformation(objPlacement[n.placementRelTo][t.value], transformation);
  }
}

function getLocation(placement) {
  return placement[n.location][t.value][n.coordinates][t.value];
}

function getAxisX(placement) {
  if (placement[n.refDirection][t.value] === def) return [1, 0, 0];
  return placement[n.refDirection][t.value][n.dirRatios][t.value];
}

function getAxisZ(placement) {
  if (!placement[n.axis] || placement[n.axis][t.value] === def)
    return [0, 0, 1];
  return placement[n.axis][t.value][n.dirRatios][t.value];
}

export { getTransformations };
