import {
  namedProps as n,
  structuredData as s,
  structuredData,
} from "../../utils/global-constants.js";
import { ifcTypes as t, getName } from "../../utils/ifc-types.js";
import { scene } from "./three-scene.js";

const materials = {

  whiteDefault: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  }),

  brownDefault: new THREE.MeshLambertMaterial({
    color: 0xc2893a,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  }),

  blueTransparent: new THREE.MeshBasicMaterial({
    color: 0x52b2bf,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    opacity: 0.2,
    transparent: true
  }),

};

const materialsMap = {
  [t.IfcWall]: materials.whiteDefault,
  [t.IfcWallStandardCase]: materials.whiteDefault,
  [t.IfcDoor]: materials.brownDefault,
  [t.IfcSpace]: materials.blueTransparent,
};

function getmaterial(ifcType) {
  return materialsMap[t[ifcType]];
}

function applycolors(structured) {
  structured[s.products].forEach((product) => {
    product[n.geometry].forEach((item) => {
      if (item.type === "Mesh")
        item.material = getmaterial(product[n.ifcClass]);
    });
  });

  structured[s.spaces].forEach((space) => {
    space[n.geometry].forEach((item) => {
      if (item.type === "Mesh")
        item.material = getmaterial(space[n.ifcClass]);
    });
  });
}

function drawEdges(structured) {
  const products = structured[s.products];
  
  products.forEach((product) => {
    product[n.geometry].forEach((item) => {

      if (item.type === "Mesh" && product[n.ifcClass])

      var geo = new THREE.EdgesGeometry(item.geometry);
      var mat = new THREE.LineBasicMaterial({ color: 0x000000 });
      var wireframe = new THREE.LineSegments(geo, mat);

      item.add(wireframe);
      scene.attach(wireframe);

      if(product[n.hasOpenings])
        product[n.hasOpenings].forEach((opening)=>{
          opening[n.geometry].forEach((o)=>{
            var geo2 = new THREE.EdgesGeometry(o.geometry);
            var wireframe2 = new THREE.LineSegments(geo2, mat);
            o.add(wireframe2);
            scene.attach(wireframe2);
          })
        })
    });
  });
}


export { applycolors, drawEdges };
