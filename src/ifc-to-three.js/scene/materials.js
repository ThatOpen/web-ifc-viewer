import { ifcTypes as t } from "../../utils/ifc-types.js";
import {
  namedProps as n,
  structuredData as s,
} from "../../utils/global-constants.js";

function applyMaterials(structured) {
  structured[s.products].forEach((product) => {
    
    product[n.geometry].forEach((item) => {
      if (item.type === "Mesh")
        item.material = getmaterial(product[n.ifcClass]);
      if (item.material.transparent === true) item.renderOrder = 1;
    });

    if (product[n.hasOpenings])
      product[n.hasOpenings].forEach((opening) => {
        const openingMesh = opening[n.geometry][0];
        openingMesh.material = getmaterial(opening[n.ifcClass]);
      });
  });

  structured[s.spaces].forEach((space) => {
    space[n.geometry].forEach((item) => {
      if (item.type === "Mesh") item.material = getmaterial(space[n.ifcClass]);
    });
  });
}

const colors = {
  black: 0x000000,
  brown: 0xc2893a,
  grey: 0x606060,
  darkBrown: 0x5c3d1e,
  darkBlue: 0x23395d,
  lightBlue: 0xadd8e6,
  white: 0xffffff,
};

const materialsMap = {
  [t.IfcWall]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey,
  },
  [t.IfcWallStandardCase]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey,
  },
  [t.IfcDoor]: {
    material: getDiffuseMat(colors.brown),
    lineColor: colors.darkBrown,
  },
  [t.IfcWindow]: {
    material: getTransparentMat(colors.lightBlue, 0.2),
    lineColor: colors.darkBlue,
  },
  [t.IfcSpace]: {
    material: getTransparentMat(colors.lightBlue, 0.2),
    lineColor: colors.black,
  },
  [t.IfcOpeningElement]: {
    material: getTransparentMat(colors.lightBlue, 0),
    lineColor: colors.grey,
  },
};

function getmaterial(ifcType) {
  return materialsMap[t[ifcType]].material;
}

function getLineColor(ifcType) {
  return materialsMap[t[ifcType]].lineColor;
}

function getTransparentMat(color, opacity = 0.2) {
  return new THREE.MeshBasicMaterial({
    color: color,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    opacity: opacity,
    transparent: true,
    depthWrite: false,
  });
}

function getDiffuseMat(color) {
  return new THREE.MeshLambertMaterial({
    color: color,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
}

function getBasicMaterial(color) {
  return new THREE.MeshBasicMaterial({
    color: color,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
}

export { applyMaterials, getLineColor };
