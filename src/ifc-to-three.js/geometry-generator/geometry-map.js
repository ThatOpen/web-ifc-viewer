import {
  namedProps as n,
  geometryTypes as g,
  structuredData as s
} from '../../utils/global-constants.js';
import { mapCurve2D, mapCurve3D } from './curves/curves-map.js';
import { mapExtrudedAreaSolid, mapSweptSolid } from './ifc-geometry/ifc-swept-solid.js';
import { mapMappedRepresentation } from './ifc-geometry/ifc-mapped-representation.js';
import { mapBrep, mapSurfaceModel } from './ifc-geometry/ifc-brep.js';
import { mapGeometricSet } from './ifc-geometry/ifc-geometric-set.js';
import { mapClipping } from './ifc-geometry/ifc-clipping.js';
import { mapBoundingBox } from './ifc-geometry/ifc-bounding-box.js';
import { mapAnnotation } from './ifc-geometry/ifc-annotation.js';

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
  getRepresentationOfItem(product[n.hasOpenings]);
  getRepresentationOfItem(product[n.hasSpatial]);
}

function getRepresentationOfItem(items) {
  if (items) items.forEach((item) => getRepresentationValue(item));
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
  mapRepresentationsOfItems(product[n.hasOpenings]);
  mapRepresentationsOfItems(product[n.hasSpatial]);
}

function mapRepresentationsOfItems(items) {
  if (items) items.forEach((item) => mapProductRepresentations(item));
}

function mapProductRepresentations(product) {
  product[n.geometry] = [];
  product[n.geomRepresentations].forEach((representation) => {
    const generatedGeometry = getMappedGeometry(representation, product);
    generatedGeometry._Data = product;
    product[n.geometry].push(generatedGeometry);
  });
}

const geometryMap = {
  [g.curve2D]: mapCurve2D,
  [g.curve3D]: mapCurve3D,
  [g.sweptSolid]: mapSweptSolid,
  [g.mappedRepresentation]: mapMappedRepresentation,
  [g.brep]: mapBrep,
  [g.geometricSet]: mapGeometricSet,
  [g.clipping]: mapClipping,
  [g.extrudedAreaSolid]: mapExtrudedAreaSolid,
  [g.surfaceModel]: mapSurfaceModel,
  [g.boundingBox]: mapBoundingBox,
  [g.annotation2D]: mapAnnotation
};

function getMappedGeometry(representation, product) {
  const type = getType(representation);
  try {
    return geometryMap[type](representation, product);
  } catch (e) {
    console.warn(`Error with item ${product[n.ifcClass]} of type ${type}: ${e}`);
    return geometryMap[type](representation, product);
  }
}

function getType(representation) {
  const type = representation[n.representationType];
  return type ? type : representation[n.ifcClass];
}

export { constructGeometries, getMappedGeometry };
