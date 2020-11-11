function getHorizontalRotation(axis) {
  if (isStraightAngle(axis)) return getStraightAngle(axis);
  return Math.atan(axis[1] / axis[0]) + correctAngle(axis);
}

function isStraightAngle(axis) {
  if (axis[0] === 0 || axis[1] === 0) return true;
  return false;
}

function getStraightAngle(axis) {
  if (axis[0] === 0 && axis[1] > 0) return Math.PI / 2;
  if (axis[1] === 0 && axis[0] < 0) return Math.PI;
  if (axis[0] === 0 && axis[1] < 0) return (3 * Math.PI) / 2;
  return 0;
}

function correctAngle(axis) {
  return axis[0] < 0 ? Math.PI : 0;
}

function getVerticalRotation(axis) {
  return 0;
}

export { getHorizontalRotation, getVerticalRotation };
