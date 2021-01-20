function createLine(coordinates: any) {
  
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const material = new THREE.LineBasicMaterial({
    linecap: "round",
    color: 0xff0000,
  });

  const points: any = [];
  coordinates.forEach((e: any) => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    points.push(new THREE.Vector3(e[0], e[1]));
  });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const line = new THREE.Line(geometry, material);

  return line;
}

export { createLine };
