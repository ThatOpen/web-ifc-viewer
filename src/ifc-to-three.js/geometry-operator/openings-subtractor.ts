import { mainObject } from '../scene/mainObject.js';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '../.... Remove this comment to see the full error message
import CSG from '../../../libs/CSGMesh.js';
import { structuredData as s, namedProps as n } from '../../utils/global-constants.js';
import { applyBoolDifferences } from './boolean-difference.js';

function subtractOpenings(structured: any) {
  structured[s.products].forEach((product: any) => {
    try {
      if (product[n.hasOpenings]) applyBooleanOperation(product);
    } catch (e) {
      console.warn('Error with CSG operations with: ', product, e);
    }
  });
}

function applyBooleanOperation(product: any) {
  for (let i = 0; i < product[n.geometry].length; i++) {
    const geometryItem = product[n.geometry][i];
    if (geometryItem.type === 'Mesh' && !geometryItem[n.isBrep])
      product[n.geometry][i] = applyBooleanOperationOnMesh(product, geometryItem);
  }
}

function applyBooleanOperationOnMesh(product: any, geometry: any) {
  const openings = getOpenings(product);
  const resultGeom = applyBoolDifferences(geometry, openings);
  const result = CSG.toMesh(resultGeom, geometry.matrix);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  result.material = new THREE.MeshPhongMaterial();
  addResultToScene(geometry, openings, result);
  return result;
}

function addResultToScene(geometryItem: any, openings: any, result: any) {
  result._Data = geometryItem._Data; //Reference to parsed IFC information
  result.attach(...openings);
  result.attach(...geometryItem.children);
  mainObject.add(result);
  mainObject.remove(geometryItem);
}

function getOpenings(product: any) {
  const openingsReps = product[n.hasOpenings];
  const openings = [];
  for (let i = 0; i < openingsReps.length; i++) openings.push(openingsReps[i][n.geometry][0]);
  return openings;
}

export { subtractOpenings };
