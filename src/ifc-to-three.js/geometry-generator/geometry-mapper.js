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
    try {
      getGeomRepresentation(product);
      mapRepresentation(product);
    } catch (e) {
      console.error(e);
    }
  });
}

function getGeomRepresentation(product) {
  try {
    product[n.rawRepresentation] =
      product[n.representation][t.value][n.representations][t.value];
  } catch (e) {
    console.error(e);
  }
}

function mapRepresentation(product) {
  product[n.rawGeometry] = [];
  product[n.rawRepresentation].forEach((representation) => {
    const mapped = getMappedGeometry(representation);
    if (mapped) {
      product[n.rawGeometry].push(mapped);
    }
  });
}

function getType(representation) {
  return representation[n.representationType][t.value];
}

function getMappedGeometry(representation) {
  try {
    return geometryMap[getType(representation)](representation);
  } catch (e) {
    return null;
  }
}

export { getRepresentations };
