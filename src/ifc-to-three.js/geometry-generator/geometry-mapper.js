import { mapCurve2D } from "./ifc-curve2d.js";
import { mapSweptSolid } from "./ifc-sweptSolid.js";
import {
  geometryTypes as g,
  namedProps as n,
  structuredData as s,
  typeValue as t,
} from "../../utils/global-constants.js";

const geometryMap = {
  [g.curve2D]: mapCurve2D,
  [g.sweptSolid]: mapSweptSolid,
};

function constructGeometry(structured) {
  structured[s.products].forEach((product) => {
    try {
      getRepresentations(product);
      mapARepresentations(product);
    } catch (e) {
      console.warn(e);
    }
  });
}

function getRepresentations(product) {
  getRepresentationValue(product);
  if (product[n.openings])
    product[n.openings].forEach((opening) => {
      getRepresentationValue(opening);
    });
}

function getRepresentationValue(product) {
  try {
    product[n.geomRepresentations] =
      product[n.representation][t.value][n.representations][t.value];
  } catch (e) {
    console.warn(e);
  }
}

function mapARepresentations(product) {
  mapProductRepresentations(product);
  if (product[n.openings])
    product[n.openings].forEach((opening) => {
      mapProductRepresentations(opening);
    });
}

function mapProductRepresentations(product) {
  product[n.geometry] = [];
  product[n.geomRepresentations].forEach((representation) => {
    product[n.geometry].push(getMappedGeometry(representation, product));
  });
}

function getMappedGeometry(representation, product) {
  try {
    return geometryMap[getType(representation)](representation, product);
  } catch (e) {
    console.warn(e);
  }
}

function getType(representation) {
  return representation[n.representationType][t.value];
}

export { constructGeometry };
