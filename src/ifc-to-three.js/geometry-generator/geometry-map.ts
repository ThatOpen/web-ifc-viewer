import { namedProps as n, geometryTypes as g, structuredData as s } from '../../utils/global-constants.js';
import { mapCurve2D } from './curves/curve.js';
import { mapExtrudedAreaSolid, mapSweptSolid } from './ifc-geometry/ifc-swept-solid.js';
import { mapMappedRepresentation } from './ifc-geometry/ifc-mapped-representation.js';
import { mapBrep, mapSurfaceModel } from './ifc-geometry/ifc-brep.js';
import { mapGeometricSet } from './ifc-geometry/ifc-geometric-set.js';
import { mapClipping } from './ifc-geometry/ifc-clipping.js';
import { mapBoundingBox } from './ifc-geometry/ifc-bounding-box.js';
import { mapAnnotation } from './ifc-geometry/ifc-annotation.js';

function constructGeometries(structured: any) {
  structured[s.products].forEach((product: any) => constructGeometry(product));
  structured[s.spaces].forEach((space: any) => constructGeometry(space));
}

function constructGeometry(item: any) {
  try {
    getRepresentations(item);
    mapRepresentations(item);
  } catch (e) {
    console.warn(e);
  }
}

function getRepresentations(product: any) {
  getRepresentationValue(product);
  getRepresentationOfItem(product[n.hasOpenings]);
  getRepresentationOfItem(product[n.hasSpatial]);
}

function getRepresentationOfItem(items: any) {
  if (items) items.forEach((item: any) => getRepresentationValue(item));
}

function getRepresentationValue(product: any) {
  try {
    const representations = product[n.representation][n.representations];
    product[n.geomRepresentations] = representations ? representations : [];
  } catch (e) {
    console.warn(e);
  }
}

function mapRepresentations(product: any) {
  mapProductRepresentations(product);
  mapRepresentationsOfItems(product[n.hasOpenings]);
  mapRepresentationsOfItems(product[n.hasSpatial]);
}

function mapRepresentationsOfItems(items: any) {
  if (items) items.forEach((item: any) => mapProductRepresentations(item));
}

function mapProductRepresentations(product: any) {
  product[n.geometry] = [];
  product[n.geomRepresentations].forEach((representation: any) => {
    const generatedGeometry = getMappedGeometry(representation, product);
    generatedGeometry._Data = product;
    product[n.geometry].push(generatedGeometry);
  }
  );
}

// @ts-expect-error ts-migrate(7022) FIXME: 'geometryMap' implicitly has type 'any' because it... Remove this comment to see the full error message
const geometryMap = {
  [g.curve2D]: mapCurve2D,
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

// @ts-expect-error ts-migrate(7023) FIXME: 'getMappedGeometry' implicitly has return type 'an... Remove this comment to see the full error message
function getMappedGeometry(representation: any, product: any) {
  const type = getType(representation);
  try {
    return geometryMap[type](representation, product);
  } catch (e) {
    console.warn(`Error with item ${product[n.ifcClass]} of type ${type}: ${e}`);
  }
}

function getType(representation: any) {
  const type = representation[n.representationType];
  return type ? type : representation[n.ifcClass];
}


export { constructGeometries, getMappedGeometry };
