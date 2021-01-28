import { getMaterial, getLineColor } from './materials-map.js';
import { namedProps as n, structuredData as s } from '../../utils/global-constants.js';

function applyMaterials(structured) {
  applyMaterialOnSpaces(structured);
  structured[s.products].forEach((product) => {
    applyMaterialOnMesh(product);
    applyMaterialOnOpenings(product);
    applyMaterialOnSubElements(product);
  });
}

function applyMaterialOnSpaces(structured) {
  structured[s.spaces].forEach((space) =>
    space[n.geometry].forEach((item) => getMeshMaterial(item, space[n.ifcClass]))
  );
}

function applyMaterialOnMesh(product) {
  product[n.geometry].forEach((item) => {
    getMeshMaterial(item, product[n.ifcClass]);
  });
}

function applyMaterialOnOpenings(product) {
  applyMaterialOnItem(product[n.hasOpenings]);
}

function applyMaterialOnSubElements(product) {
  applyMaterialOnItem(product[n.hasSpatial]);
}

function getMeshMaterial(item, ifcType) {
  if (item.type === 'Mesh') item.material = getMaterial(ifcType);
  if (item.material && item.material.transparent === true) item.renderOrder = 1;
}

function applyMaterialOnItem(items) {
  if (items)
    items.forEach((prop) => {
      prop[n.geometry].forEach((geometry) => {
        if (geometry.type === 'Mesh') geometry.material = getMaterial(prop[n.ifcClass]);
      });
    });
}

export { applyMaterials, getLineColor };
