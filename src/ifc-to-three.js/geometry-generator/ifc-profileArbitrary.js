import { createExtrusionsByPoints } from "./three-extrusion.js";
import { namedProps as n } from "../../utils/global-constants.js";

function mapArbitraryProfileExtrusion(extruded, product) {
  if(isCurveDefinedByPoints(extruded)){
    const points = getArbitraryProfilePoints(extruded);
    return createExtrusionsByPoints(points, extruded.depth);
  }
  return mapCurveDefinedBySegments(extruded, product);
}

function isCurveDefinedByPoints(extruded){
  return extruded.profile[n.outerCurve][n.points] ? true : false;
}

function mapCurveDefinedBySegments(extruded, product){
  console.log(extruded);
  return new THREE.Mesh(new THREE.BoxGeometry());
}

function getArbitraryProfilePoints(extruded) {
  const profile = extruded.profile;
  const points = profile[n.outerCurve][n.points];
  return points.map((point) => {
    const coords = point[n.coordinates];
    return [-coords[0], -coords[1]];
  });
}

export { mapArbitraryProfileExtrusion };
