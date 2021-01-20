import { namedProps as n } from '../../../utils/global-constants.js';

function mapBoundingBox(shape: any) {
  const representation = shape[n.items][0];
  const dims = getBoundingBoxDimensions(representation);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const boundingBox = new THREE.BoxGeometry(dims.x, dims.y, dims.z);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const mesh = new THREE.Mesh(boundingBox);
  setBoundingBoxPosition(mesh, representation, dims);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  return new THREE.Object3D();
}

function setBoundingBoxPosition(mesh: any, representation: any, dims: any) {
  const bottomLeftCorner = representation[n.corner][n.coordinates];
  mesh.position.set(bottomLeftCorner[0], bottomLeftCorner[1], bottomLeftCorner[2]);
  mesh.position.x += dims.x / 2;
  mesh.position.y += dims.y / 2;
  mesh.position.z += dims.z / 2;
}

function getBoundingBoxDimensions(representation: any) {
  return {
    x: representation[n.xDim],
    y: representation[n.yDim],
    z: representation[n.zDim]
  };
}

export { mapBoundingBox };
