function getHorizontalRotation(axis) {
  if (axis[0] === 0 || axis[1] === 0) {
    if (axis[0] === 0 && axis[1] > 0) return Math.PI / 2;
    if (axis[0] === 0 && axis[1] < 0) return (3 * Math.PI) / 2;
    if (axis[1] === 0 && axis[0] > 0) return 0;
    if (axis[1] === 0 && axis[0] < 0) return Math.PI;
    return;
  }

  let sum = 0;
  if (axis[0] < 0 && axis[1] < 0) sum = Math.PI;
  if (axis[0] < 0 && axis[1] > 0) sum = Math.PI / 2;
  if (axis[0] > 0 && axis[1] < 0) sum = (3 * Math.PI) / 2;
  return (Math.atan(axis[1] / axis[0]) + sum).toFixed(2);
}

function getVerticalRotation(axis) {
  return 0;
}

export { getHorizontalRotation, getVerticalRotation };
