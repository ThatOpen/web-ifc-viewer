//In the 3d scene, the axis are swapped: X is Z, Y is X and Z is Y
// E. g. axis[2] is the Z axis and is equivalent to the X dimension of the IFC

function getHorizontalRotation(axis) {
  if (isStraightHorizontalAngle(axis)) return getStraightHorizontalAngle(axis);
  return Math.atan(axis[0] / axis[2]) + correctAngle(axis);
}

function getVerticalRotation(axis) {
  if (isStraightVerticalAngle(axis)) return getStraightVerticalAngle(axis);
  return Math.atan(axis[1] / axis[0]);
}

function isStraightHorizontalAngle(axis) {
  if (axis[0] === 0 || axis[2] === 0) return true;
  return false;
}

function isStraightVerticalAngle(axis) {
  if (axis[1] === 0 || axis[0] === 0) return true;
  return false;
}

function getStraightHorizontalAngle(axis) {
  if (axis[2] === 0 && axis[0] > 0) return Math.PI / 2;
  if (axis[0] === 0 && axis[2] < 0) return Math.PI;
  if (axis[2] === 0 && axis[0] < 0) return (3 * Math.PI) / 2;
  return 0;
}

function getStraightVerticalAngle(axis) {
  if (axis[1] === 0 && axis[0] > 0) return Math.PI / 2;
  if (axis[0] === 0 && axis[1] < 0) return Math.PI;
  if (axis[1] === 0 && axis[0] < 0) return (3 * Math.PI) / 2;
  return 0;
}

function correctAngle(axis) {
  if (axis[2] < 0) return Math.PI;
  return 0;
}

export { getHorizontalRotation, getVerticalRotation };
