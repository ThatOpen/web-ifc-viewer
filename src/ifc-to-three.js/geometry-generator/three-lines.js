function createLine(coordinates) {
  
  const material = new THREE.LineBasicMaterial({
    linecap: "round",
    color: 0xff0000,
  });

  const points = [];
  coordinates.forEach((e) => {
    points.push(new THREE.Vector3(e[0], e[1]));
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);

  return line;
}

export { createLine };
