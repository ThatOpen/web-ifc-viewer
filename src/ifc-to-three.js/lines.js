import { scene } from "./scene.js";

function createLine(coordinates) {
  const material = new THREE.LineBasicMaterial({
    linecap: "round",
    color: 0xff0000,
  });

  const points = [];
  coordinates.forEach((e) => {
    points.push(new THREE.Vector3(e[0], e[1], e[2] ? e[2] : 0));
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

export { createLine };
