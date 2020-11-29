import { mapCurve2D } from "./ifc-curve2d.js";
import { mapSweptSolid } from "./ifc-sweptSolid.js";
import { mapMappedRepresentation } from "./ifc-mappedRepresentation.js";
import { mapBrep } from "./ifc-brep.js";
import {
  geometryTypes as g,
  namedProps as n,
  structuredData as s,
} from "../../utils/global-constants.js";

const geometryMap = {
  [g.curve2D]: mapCurve2D,
  [g.sweptSolid]: mapSweptSolid,
  [g.mappedRepresentation]: mapMappedRepresentation,
  [g.brep]: mapBrep,
};

function constructGeometries(structured) {
  structured[s.products].forEach((product) => constructGeometry(product));
  structured[s.spaces].forEach((space) => constructGeometry(space));
}

function constructGeometry(item) {
  try {
    getRepresentations(item);
    mapRepresentations(item);
  } catch (e) {
    console.warn(e);
  }
}

function getRepresentations(product) {
  getRepresentationValue(product);

  if (product[n.hasOpenings])
    product[n.hasOpenings].forEach((opening) => {
      getRepresentationValue(opening);
    });

  if(product[n.hasSpatial])
  product[n.hasSpatial].forEach((spatial) => {
    getRepresentationValue(spatial);
  });
}

function getRepresentationValue(product) {
  try {
    const representations = product[n.representation][n.representations];
    product[n.geomRepresentations] = representations ? representations : [];
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

    if (product[n.hasSpatial])
    product[n.hasSpatial].forEach((spatial) => {
      mapProductRepresentations(spatial);
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
  return representation[n.representationType];
}

export { constructGeometries, getMappedGeometry };
