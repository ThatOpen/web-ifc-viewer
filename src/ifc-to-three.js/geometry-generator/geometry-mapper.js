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

function getRepresentations(structured) {
  structured[s.products].forEach((product) => {
    getGeomRepresentation(product);
    mapRepresentation(product);
  });
}

function getGeomRepresentation(product) {
  product[n.rawRepresentation] =
    product[n.representation][t.value][n.representations][t.value];
}

function mapRepresentation(product) {
  product[n.rawGeometry] = [];
  product[n.rawRepresentation].forEach((representation) => {
    const mapped = getMappedGeometry(representation);
    product[n.rawGeometry].push(mapped);
  });
}

function getType(representation) {
  return representation[n.representationType][t.value];
}

function getMappedGeometry(representation) {
  return geometryMap[getType(representation)](representation);
}

export { getRepresentations };
