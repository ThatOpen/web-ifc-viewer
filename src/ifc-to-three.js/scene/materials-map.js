import { ifcTypes as t } from '../../utils/ifc-types.js';
import { getTransformOfGeometry } from '../geometry-transformer/local-transform-tracker.js';

const colors = {
  black: 0x000000,
  brown: 0xc2893a,
  red: 0xff0000,
  grey: 0x606060,
  lightGrey: 0x858585,
  darkBrown: 0x5c3d1e,
  darkBlue: 0x23395d,
  lightBlue: 0xadd8e6,
  white: 0xffffff
};

const materials = {
  whiteDiffuse: getDiffuseMat(colors.white),
  brownDiffuse: getDiffuseMat(colors.brown),
  transparent: getTransparentMat(colors.white, 0),
  translucentBlue: getTransparentMat(colors.lightBlue, 0.2),
  translucentWhite: getTransparentMat(colors.white, 0.2),
}

const lineMaterials = {
  grey: newLineMaterial(colors.grey),
  lightGrey: newLineMaterial(colors.lightGrey),
  brown: newLineMaterial(colors.darkBrown),
  blue: newLineMaterial(colors.darkBlue),
  black: newLineMaterial(colors.black),
}

function getMaterial(ifcType) {
  try {
    return materialsMap[t[ifcType]].material;
  } catch (e) {
    console.warn(`The type ${ifcType} doesn't have a material implemented.`);
    return materials.whiteDiffuse;
  }
}

function getLineMaterial(ifcType) {
  try{
    return materialsMap[t[ifcType]].lineMaterial;
  } catch {
    return newLineMaterial(colors.grey);
  }
}

function getDiffuseMat(color) {
  return new THREE.MeshLambertMaterial({
    ...getBaseSettings(color)
  });
}

function getBasicMaterial(color) {
  return new THREE.MeshBasicMaterial({
    ...getBaseSettings(color)
  });
}

function getTransparentMat(color, opacity = 0.2) {
  return new THREE.MeshBasicMaterial({
    ...getBaseSettings(color),
    opacity: opacity,
    transparent: true,
    depthWrite: false
  });
}

function getBaseSettings(color) {
  return {
    color: color,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  };
}

function newLineMaterial(lineColor){
  return new THREE.LineBasicMaterial({ color: lineColor });
}

const materialsMap = {
  [t.IfcWall]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcWallStandardCase]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcSite]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcSlab]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcCovering]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcRoof]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcEquipmentElement]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcFurnishingElement]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcRailing]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcColumn]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcFooting]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcBeam]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcStair]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcStairFlight]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcMember]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcFlowTerminal]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcBuildingElementProxy]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcReinforcingBar]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.brown
  },
  [t.IfcReinforcingMesh]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.brown
  },
  [t.IfcMechanicalFastener]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.brown
  },
  [t.IfcFastener]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.brown
  },
  [t.IfcRamp]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.brown
  },
  [t.IfcFlowSegment]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.brown
  },
  [t.IfcFlowFitting]: {
    material: materials.whiteDiffuse,
    lineMaterial: lineMaterials.brown
  },
  [t.IfcDoor]: {
    material: materials.brownDiffuse,
    lineMaterial: lineMaterials.brown
  },
  [t.IfcPlate]: {
    material: materials.translucentBlue,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcWindow]: {
    material: materials.translucentBlue,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcSpace]: {
    material: materials.transparent,
    lineMaterial: lineMaterials.grey
  },
  [t.IfcOpeningElement]: {
    material: materials.transparent,
    lineMaterial: lineMaterials.grey
  },
};

export { getMaterial, getLineMaterial };
