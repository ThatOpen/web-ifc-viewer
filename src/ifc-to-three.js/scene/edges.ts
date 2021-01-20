import { getLineColor } from './materials-map.js';
import { namedProps as n, structuredData as s } from '../../utils/global-constants.js';

function drawEdges(structured: any) {
  structured[s.products].forEach((product: any) => {
    generateEdgesOnProduct(product);
    generateEdgesOnItems(product[n.hasSpatial]);
    generateEdgesOnItems(product[n.hasOpenings]);
  });
}

function generateEdgesOnProduct(product: any) {
  product[n.geometry].forEach((item: any) => {
    const ifcClass = product[n.ifcClass];
    if (item.type === 'Mesh' && ifcClass) createEdgesOfItem(ifcClass, item);
  });
}

function generateEdgesOnItems(items: any) {
  if (items)
    items.forEach((item: any) => item[n.geometry].forEach((geometry: any) => createEdgesOfItem(item[n.ifcClass], geometry))
    );
}

function createEdgesOfItem(ifcClass: any, item: any) {
  const lineColor = getLineColor(ifcClass);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const geometry = new THREE.EdgesGeometry(item.geometry);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const material = new THREE.LineBasicMaterial({ color: lineColor });
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const wireframe = new THREE.LineSegments(geometry, material);
  item.add(wireframe);
}

export { drawEdges };
