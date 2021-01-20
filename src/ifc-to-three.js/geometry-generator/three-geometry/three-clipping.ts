function createClippingBox(orientation: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const geometry = new THREE.BoxBufferGeometry(100000, 100000, 100000);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const mesh = new THREE.Mesh(geometry);
  const direction = orientation ? -1 : 1;
  mesh.position.z += 50000 * direction;
  mesh.updateMatrix();
  return mesh;
}

export { createClippingBox };
