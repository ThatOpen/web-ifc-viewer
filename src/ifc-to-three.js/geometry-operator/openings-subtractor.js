import { mainObject } from '../scene/mainObject.js';
import CSG from '../../../libs/CSGMesh.js';
import { structuredData as s, namedProps as n } from '../../utils/global-constants.js';
import { applyBoolDifferences } from './boolean-difference.js';

function subtractOpenings(structured) {
  structured[s.products].forEach((product) => {
    try {
      if (product[n.hasOpenings]) applyBooleanOperation(product);
    } catch (e) {
      console.warn('Error with CSG operations with: ', product, e);
    }
  });
}

function applyBooleanOperation(product) {
  for (let i = 0; i < product[n.geometry].length; i++) {
    const geometryItem = product[n.geometry][i];
    if (geometryItem.type === 'Mesh' && !geometryItem[n.isBrep])
      product[n.geometry][i] = applyBooleanOperationOnMesh(product, geometryItem);
  }
}

function applyBooleanOperationOnMesh(product, geometry) {
  const openings = getOpenings(product);
  const resultGeom = applyBoolDifferences(geometry, openings);
  const result = CSG.toMesh(resultGeom, geometry.matrix);
  result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
  result.material = new THREE.MeshPhongMaterial();
  addResultToScene(geometry, openings, result);
  return result;
}

function addResultToScene(geometryItem, openings, result) {
  result._Data = geometryItem._Data; //Reference to parsed IFC information
  openings.forEach((opening) => result.attach(opening));
  geometryItem.children.forEach((child) => result.attach(child));
  mainObject.add(result);
  mainObject.remove(geometryItem);
}

function getOpenings(product) {
  const openingsReps = product[n.hasOpenings];
  const openings = [];
  for (let i = 0; i < openingsReps.length; i++) openings.push(openingsReps[i][n.geometry][0]);
  return openings;
}

export { subtractOpenings };
