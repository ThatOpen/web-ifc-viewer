import { namedProps as n } from '../../../utils/global-constants.js';

function mapBoundingBox(shape) {
  const representation = shape[n.items][0];
  const dims = getBoundingBoxDimensions(representation);
  const boundingBox = new THREE.BoxGeometry(dims.x, dims.y, dims.z);
  const mesh = new THREE.Mesh(boundingBox);
  setBoundingBoxPosition(mesh, representation, dims);
  return new THREE.Object3D();
}

function setBoundingBoxPosition(mesh, representation, dims) {
  const bottomLeftCorner = representation[n.corner][n.coordinates];
  mesh.position.set(bottomLeftCorner[0], bottomLeftCorner[1], bottomLeftCorner[2]);
  mesh.position.x += dims.x / 2;
  mesh.position.y += dims.y / 2;
  mesh.position.z += dims.z / 2;
}

function getBoundingBoxDimensions(representation) {
  return {
    x: representation[n.xDim],
    y: representation[n.yDim],
    z: representation[n.zDim]
  };
}

export { mapBoundingBox };
