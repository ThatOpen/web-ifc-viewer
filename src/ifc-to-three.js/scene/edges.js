import { getLineColor } from "./materials.js";
import {
  namedProps as n,
  structuredData as s,
} from "../../utils/global-constants.js";
import { scene } from "./three-scene.js";

function drawEdges(structured) {
  const products = structured[s.products];

  products.forEach((product) => {
    product[n.geometry].forEach((item) => {
      const ifcClass = product[n.ifcClass];
      if (item.type === "Mesh" && ifcClass) {
        const lineColor = getLineColor(ifcClass);
        var geo = new THREE.EdgesGeometry(item.geometry);
        var mat = new THREE.LineBasicMaterial({ color: lineColor });
        var wireframe = new THREE.LineSegments(geo, mat);
        item.add(wireframe);

        if (product[n.hasOpenings])
          product[n.hasOpenings].forEach((opening) => {
            opening[n.geometry].forEach((item) => {
              var geo2 = new THREE.EdgesGeometry(item.geometry);
              const openingLineColor = getLineColor(opening[n.ifcClass]);
              var openingMat = new THREE.LineBasicMaterial({ color: openingLineColor });
              var wireframe2 = new THREE.LineSegments(geo2, openingMat);
              item.add(wireframe2);
            });
          });
      }
    });

    if (product[n.hasSpatial])
    product[n.hasSpatial].forEach((spatial) => {
      spatial[n.geometry].forEach((item) => {
        var geo3 = new THREE.EdgesGeometry(item.geometry);
        const spatialLineColor = getLineColor(spatial[n.ifcClass]);
        var spatialMat = new THREE.LineBasicMaterial({ color: spatialLineColor });
        var wireframe3 = new THREE.LineSegments(geo3, spatialMat);
        item.add(wireframe3);
      });
    });

  });
}

export { drawEdges };
