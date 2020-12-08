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

  if (product[n.hasOpenings])
    product[n.hasOpenings].forEach((opening) => {
      getRepresentationValue(opening);
    });

  if (product[n.hasSpatial])
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

export { constructGeometries };
