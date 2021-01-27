import { getLineColor } from './materials-map.js';
import { namedProps as n, structuredData as s } from '../../utils/global-constants.js';

function drawEdges(structured) {
  structured[s.products].forEach((product) => {
    generateEdgesOnProduct(product);
    generateEdgesOnItems(product[n.hasSpatial]);
    generateEdgesOnItems(product[n.hasOpenings]);
  });
}

function generateEdgesOnProduct(product) {
  product[n.geometry].forEach((item) => {
    const ifcClass = product[n.ifcClass];
    if (item.type === 'Mesh' && ifcClass) createEdgesOfItem(ifcClass, item);
  });
}

function generateEdgesOnItems(items) {
  if (items)
    items.forEach((item) =>
      item[n.geometry].forEach((geometry) => createEdgesOfItem(item[n.ifcClass], geometry))
    );
}

function createEdgesOfItem(ifcClass, item) {
  try{
    if (item.type === 'Mesh'){
      const lineColor = getLineColor(ifcClass);
      const geometry = new THREE.EdgesGeometry(item.geometry);
      const material = new THREE.LineBasicMaterial({ color: lineColor });
      const wireframe = new THREE.LineSegments(geometry, material);
      item.add(wireframe);
    }
  }catch(e){
    console.warn(`Error generating edges of the following item, of class ${ifcClass}:`, item)
  }
}

export { drawEdges };
