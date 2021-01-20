import { mainObject } from '../scene/mainObject.js';
import { namedProps as n, structuredData as s } from '../../utils/global-constants.js';

function applyScale(structured: any) {
  const units = structured[s.units][n.units];
  const scale = getUnitScale(units);
  if (scale === 1) return;
  applyScaleOnItems(scale, structured);
}

function applyScaleOnItems(scale: any, structured: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const axis = new THREE.Object3D();
  mainObject.add(axis);
  const geometries = getALlGeometries(structured);
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'geometry' implicitly has an 'any' type.
  geometries.forEach((geometry) => {
    axis.attach(geometry);
    axis.scale.set(scale, scale, scale);
    mainObject.attach(geometry);
    axis.scale.set(1, 1, 1);
  });
}

function getALlGeometries(structured: any) {
  const allGeometry: any = [];
  structured[s.products].forEach((product: any) => getGeometry(product, allGeometry));
  return allGeometry;
}

function getGeometry(product: any, allGeometry: any) {
  allGeometry.push(...product[n.geometry]);
  if (product[n.hasSpatial])
    product[n.hasSpatial].forEach((spatial: any) => getGeometry(spatial, allGeometry));
}

function getUnitScale(units: any) {
  const lengthUnit = units.filter((unitType: any) => {
    return unitType[n.unitType] === 'LENGTHUNIT';
  })[0];
  const prefix = lengthUnit[n.prefix];
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return unitMap[prefix];
}

const unitMap = {
  EXA:   100000000,
  PETA:  10000000,
  TERA:  1000000,
  GIGA:  100000,
  MEGA:  10000,
  KILO:  1000,
  HECTO: 100,
  DECA:  10,
  $:     1,
  DECI:  0.1,
  CENTI: 0.01,
  MILLI: 0.001,
  MICRO: 0.0001,
  NANO:  0.00001,
  PICO:  0.000001,
  FEMTO: 0.0000001,
  ATTO:  0.00000001
};

export { applyScale };
