import {
  geometryTypes as g,
  namedProps as n,
  structuredData as s,
  typeValue as t,
} from "../utils/global-constants.js";
import { createLine } from "./lines.js";
import { createPoint } from "./points.js";
import { scene } from "./scene.js";

function buildGeometry(structured) {
  const reps = getRepresentations(structured);
  console.log(structured);
  mapRepresentations(reps);
}

function getRepresentations(structured) {
  const reps = [];
  structured[s.products].forEach((e) => {
    reps.push(e[n.representation][t.value][n.representations][t.value]);
  });
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

function mapSweptSolid(shape) {}

export { buildGeometry };
