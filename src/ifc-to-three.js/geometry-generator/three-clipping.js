function createClippingBox(orientation) {
  const geometry = new THREE.BoxBufferGeometry(100, 100, 100);
  const mesh = new THREE.Mesh(geometry);
  const direction = orientation ? -1 : 1;
  mesh.position.z += 50 * direction;
  mesh.updateMatrix();
  return mesh;
}

export { createClippingBox };
