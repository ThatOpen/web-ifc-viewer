import { trackLocalTransform } from "./local-transform-tracker.js";
import { applyTransforms } from "./local-transform-applier.js";
import {
  defaultValue as def,
  namedProps as n,
  structuredData as s,
} from "../../utils/global-constants.js";

function applyTransformations(structured) {
  structured[s.products].forEach((product) => {
    applyTransform(product);
  });
}

function applyTransform(product) {
  getTransform(product, getPlacement(product));
  applyTransforms(product, n.transform);

  if (product[n.hasOpenings])
    product[n.hasOpenings].forEach((opening) => {
      getTransform(opening, getPlacement(opening));
      applyTransforms(opening, n.transform);
    });
}

//Gets all the transforms (local origins) recursively

function getTransform(product, objPlacement) {
  try {
    const placement = objPlacement[n.relativePlacement];
    trackLocalTransform(product, placement, n.transform);
    if (objPlacement[n.placementRelTo] != def) {
      getTransform(product, objPlacement[n.placementRelTo]);
    }
  } catch (e) {
    console.warn(e);
  }
}

function getPlacement(product) {
  try {
    return product[n.objectPlacement];
  } catch (e) {
    console.warn(e);
  }
}

export { applyTransformations };
