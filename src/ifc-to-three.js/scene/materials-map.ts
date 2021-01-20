import { ifcTypes as t } from '../../utils/ifc-types.js';
import { getTransformOfGeometry } from '../geometry-transformer/local-transform-tracker.js';

function getMaterial(ifcType: any) {
  try {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return materialsMap[t[ifcType]].material;
  } catch (e) {
    console.warn(`The type ${ifcType} doesn't have a material implemented.`);
  }
}

function getLineColor(ifcType: any) {
  try{
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return materialsMap[t[ifcType]].lineColor;
  } catch {
    return materialsMap[t.IfcWall];
  }
}

function getDiffuseMat(color: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  return new THREE.MeshLambertMaterial({
    ...getBaseSettings(color)
  });
}

function getBasicMaterial(color: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  return new THREE.MeshBasicMaterial({
    ...getBaseSettings(color)
  });
}

function getTransparentMat(color: any, opacity = 0.2) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  return new THREE.MeshBasicMaterial({
    ...getBaseSettings(color),
    opacity: opacity,
    transparent: true,
    depthWrite: false
  });
}

function getBaseSettings(color: any) {
  return {
    color: color,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  };
}

const colors = {
  black: 0x000000,
  brown: 0xc2893a,
  red: 0xff0000,
  grey: 0x606060,
  darkBrown: 0x5c3d1e,
  darkBlue: 0x23395d,
  lightBlue: 0xadd8e6,
  white: 0xffffff
};

const materialsMap = {
  [t.IfcWall]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [t.IfcWallStandardCase]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [t.IfcSite]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [t.IfcSlab]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [t.IfcCovering]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [t.IfcRoof]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [t.IfcEquipmentElement]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [t.IfcFurnishingElement]: {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    material: getDiffuseMat(colors.white, 0),
    lineColor: colors.darkBrown
  },
  [t.IfcDoor]: {
    material: getDiffuseMat(colors.brown),
    lineColor: colors.darkBrown
  },
  [t.IfcRailing]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [t.IfcColumn]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [t.IfcStair]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [t.IfcStairFlight]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [t.IfcPlate]: {
    material: getTransparentMat(colors.lightBlue, 0.2),
    lineColor: colors.darkBlue
  },
  [t.IfcMember]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [t.IfcFlowTerminal]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [t.IfcWindow]: {
    material: getTransparentMat(colors.lightBlue, 0.2),
    lineColor: colors.darkBlue
  },
  [t.IfcSpace]: {
    material: getTransparentMat(colors.lightBlue, 0),
    lineColor: colors.black
  },
  [t.IfcOpeningElement]: {
    material: getTransparentMat(colors.lightBlue, 0),
    lineColor: colors.black
  },
  [t.IfcBuildingElementProxy]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
};

export { getMaterial, getLineColor };
