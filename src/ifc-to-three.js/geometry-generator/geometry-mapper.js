import { mapCurve2D } from "./ifc-curve2d.js";
import { mapSweptSolid } from "./ifc-sweptSolid.js";
import { mapMappedRepresentation } from "./ifc-mappedRepresentation.js";
import { mapBrep } from "./ifc-brep.js";
import {
  geometryTypes as g,
  namedProps as n,
  structuredData as s,
  typeValue as t,
} from "../../utils/global-constants.js";

const geometryMap = {
  [g.curve2D]: mapCurve2D,
  [g.sweptSolid]: mapSweptSolid,
  [g.mappedRepresentation]: mapMappedRepresentation,
  [g.brep]: mapBrep,
};

function constructGeometry(structured) {
  structured[s.products].forEach((product) => {

    try {
    getRepresentations(product);
    mapRepresentations(product);
    } catch (e) {
      console.warn(e);
    }

  });
}

function getRepresentations(product) {
  getRepresentationValue(product);
  if (product[n.hasOpenings])
    product[n.hasOpenings].forEach((opening) => {
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

function mapRepresentations(product) {
  mapProductRepresentations(product);
  if (product[n.hasOpenings])
    product[n.hasOpenings].forEach((opening) => {
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
    const representationType = getType(representation);
    return geometryMap[representationType](representation, product);
  } catch (e) {
    console.warn(e);
  }
}

function getType(representation) {
  return representation[n.representationType][t.value];
}

export { constructGeometry, getMappedGeometry };
