import { getMaterial, getLineColor } from './materials-map.js';
import { namedProps as n, structuredData as s } from '../../utils/global-constants.js';

function applyMaterials(structured: any) {
  applyMaterialOnSpaces(structured);
  structured[s.products].forEach((product: any) => {
    applyMaterialOnMesh(product);
    applyMaterialOnOpenings(product);
    applyMaterialOnSubElements(product);
  });
}

function applyMaterialOnSpaces(structured: any) {
  structured[s.spaces].forEach((space: any) => space[n.geometry].forEach((item: any) => getMeshMaterial(item, space[n.ifcClass]))
  );
}

function applyMaterialOnMesh(product: any) {
  product[n.geometry].forEach((item: any) => {
      getMeshMaterial(item, product[n.ifcClass]);
  });
}

function applyMaterialOnOpenings(product: any) {
  applyMaterialOnItem(product[n.hasOpenings]);
}

function applyMaterialOnSubElements(product: any) {
  applyMaterialOnItem(product[n.hasSpatial]);
}

function getMeshMaterial(item: any, ifcType: any) {
  if (item.type === 'Mesh') item.material = getMaterial(ifcType);
  if (item.material && item.material.transparent === true) item.renderOrder = 1;
}

function applyMaterialOnItem(items: any) {
  if (items)
    items.forEach((prop: any) => {
      const mesh = prop[n.geometry][0];
      mesh.material = getMaterial(prop[n.ifcClass]);
    });
}

export { applyMaterials, getLineColor };
