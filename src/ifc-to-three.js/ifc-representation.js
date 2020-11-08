import {
  geometryTypes as g,
  namedProps as n,
  structuredData as s,
  typeValue as t,
} from "../utils/global-constants.js";
import { getName, ifcTypes } from "../utils/ifc-types.js";
import { createExtruded } from "./three-extrudes.js";
import { createLine } from "./three-lines.js";

function getRepresentations(structured) {
  const reps = [];
  structured[s.products].forEach((e) => {
    reps.push(e[n.representation][t.value][n.representations][t.value]);
  });
  mapRepresentations(reps);
  return reps;
}

function mapRepresentations(reps) {
  reps.forEach((e) => mapRepresentation(e));
}

function mapRepresentation(rep) {
  const geometries = [];
  rep.forEach((e) => {
    geometries.push(geometryMap[e[n.representationType][t.value]](e));
  });
}

const geometryMap = {
  [g.curve2D]: mapCurve2D,
  [g.sweptSolid]: mapSweptSolid,
};

function mapCurve2D(shape) {
  const points = [];
  shape[n.items][t.value][0][n.points][t.value].forEach((e) => {
    points.push(mapPoint(e));
  });
  createLine(points);
}

function mapPoint(point) {
  return point[n.coordinates][t.value];
}

function mapSweptSolid(shape) {
  const extruded = shape[n.items][t.value][0];
  const depth = extruded[n.depth][t.value];
  const direction = extruded[n.extDirection][t.value][n.dirRatios][t.value];
  const position = extruded[n.position][t.value];
  // console.log(depth);
  // console.log(direction);
  // console.log(position);
  const profile = extruded[n.sweptArea][t.value];
  if (profile[n.ifcClass] === getName(ifcTypes.IfcRectangleProfileDef)) {
    mapRectangularProfileExtrusion(profile);
  }
  const points = [
    [0, 0],
    [0, 0.1],
    [7, 0.1],
    [7, 0],
  ];
  createExtruded(points, 3);
}

function mapRectangularProfileExtrusion(profile) {
  const profilePos = profile[n.position][t.value];
  const profileLoc = profilePos[n.location][t.value][n.coordinates][t.value];
  const profileDirection =
    profilePos[n.refDirection][t.value][n.dirRatios][t.value];
  const profileDims = [profile[n.xDim][t.value], profile[n.YDim][t.value]];
  // console.log(profileLoc);
  // console.log(profileDirection);
  // console.log(profileDims);
}

export { getRepresentations };
