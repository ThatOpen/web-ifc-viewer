function createClippingBox(orientation) {
  const geometry = new THREE.BoxBufferGeometry(100000, 100000, 100000);
  const mesh = new THREE.Mesh(geometry);
  const direction = orientation ? -1 : 1;
  mesh.position.z += 50000 * direction;
  mesh.updateMatrix();
  return mesh;
}

export { createClippingBox };
