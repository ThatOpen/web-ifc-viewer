import * as THREE from 'three';
import { Mesh } from 'three';

export function RightToLeftHand(vector: THREE.Vector3): THREE.Vector3 {
  return new THREE.Vector3(vector.x, -vector.z, vector.y);
}

const basesRegex = /^([+-][xyz])([+-][xyz])([+-][xyz])$/i;
const nameToIndex = { x: 0, y: 1, z: 2 };
const orderedVectors = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];

export function stringToAxes(axesString: string) {
  if (!basesRegex.test(axesString)) {
    return null;
  }

  axesString = axesString.toLowerCase();
  // @ts-ignore
  return axesString
    .match(basesRegex)
    .splice(1, 3)
    .map((str) => {
      const negative = str[0] === '-';
      const name = str[1];
      return { negative, name };
    });
}

export function disposeMeshRecursively(mesh: Mesh) {
  mesh.removeFromParent();
  if (mesh.geometry) mesh.geometry.dispose();
  if (mesh.material) {
    if (Array.isArray(mesh.material)) mesh.material.forEach((mat) => mat.dispose());
    else mesh.material.dispose();
  }
  if (mesh.children && mesh.children.length) {
    mesh.children.forEach((child) => disposeMeshRecursively(child as Mesh));
  }
  mesh.children.length = 0;
}

export function getBasisTransform(from: string, to: string, targetMatrix: THREE.Matrix4) {
  if (!basesRegex.test(from)) {
    return;
  }

  if (!basesRegex.test(to)) {
    return;
  }

  const fromAxes = stringToAxes(from);
  const toAxes = stringToAxes(to);

  if (!fromAxes || !toAxes) throw new Error();

  for (let i = 0; i < 3; i++) {
    const fromAxis = fromAxes[i];
    const toAxis = toAxes[i];

    // @ts-ignore
    const fromIndex = nameToIndex[fromAxis.name];
    const equalNegative = fromAxis.negative === toAxis.negative;

    const vector = orderedVectors[fromIndex];
    vector.set(0, 0, 0);
    // @ts-ignore
    vector[toAxis.name] = equalNegative ? 1 : -1;
  }

  targetMatrix.makeBasis(orderedVectors[0], orderedVectors[1], orderedVectors[2]);
}
