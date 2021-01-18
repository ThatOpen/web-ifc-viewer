import { namedProps as n, structuredData as s } from '../../utils/global-constants.js';
import { getMappedGeometry } from './geometry-map.js';

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
  product[n.geomRepresentations].forEach((representation) =>{
    const generatedGeometry = getMappedGeometry(representation, product);
    generatedGeometry._Data = product;
    product[n.geometry].push(generatedGeometry);
  }
  );
}

export { constructGeometries };
