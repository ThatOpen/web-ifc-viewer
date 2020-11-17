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
    getRepresentations(product);
    mapRepresentations(product);
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
  product[n.geomRepresentations] =
    product[n.representation][t.value][n.representations][t.value];
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
  const representationType = getType(representation);
  return geometryMap[representationType](representation, product);
}

function getType(representation) {
  return representation[n.representationType][t.value];
}

export { constructGeometry, getMappedGeometry };
