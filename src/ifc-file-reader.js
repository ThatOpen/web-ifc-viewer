// export function readIfcFile(cb) {
//   const input = document.querySelector('input[type="file"]');
//   if (!input) return;
//   input.addEventListener(
//     'change',
//     (e) => {
//       readFile(input, cb);
//     },
//     false
//   );
// }

export function readIfcFile(file, cb) {
  const reader = new FileReader();
  reader.onload = function onload() {
    if (cb) {
      cb(reader.result);
    }
  };
  reader.readAsText(file);
}
