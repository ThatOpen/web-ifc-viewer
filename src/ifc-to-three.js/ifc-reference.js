import {
  defaultValue as def,
  namedProps as n,
  pivots as p,
  structuredData as s,
  typeValue as t,
} from "../utils/global-constants.js";
import { getPivots } from "./ifc-pivots.js";

function applyTransformations(structured) {
  structured[s.products].forEach((e) => {
    getTransforms(e);
    applyTransforms(e);
  });
}

function applyTransforms(product) {
  const pivots = getPivots(product[n.transform]);
  product[n.rawGeometry].forEach((e) => {
    if (e) pivots[pivots.length - 1].add(e);
  });
  // console.log(pivots);
  product[n.trueGeometry] = pivots[0];
}

function getTransforms(product) {
  const transform = { [p.locations]: [], [p.xRotation]: [], [p.zRotation]: [] };
  getTransform(product[n.objectPlacement][t.value], transform);
  product[n.transform] = transform;
}

function getTransform(objPlacement, transform) {
  const placement = objPlacement[n.relativePlacement][t.value];

  transform[p.locations].push(getLocation(placement));
  transform[p.xRotation].push(getAxisX(placement));
  transform[p.zRotation].push(getAxisZ(placement));

  if (objPlacement[n.placementRelTo][t.value] != def) {
    getTransform(objPlacement[n.placementRelTo][t.value], transform);
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

export { applyTransformations };
