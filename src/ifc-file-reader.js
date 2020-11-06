import { loadIfcFileItems } from "./ifc-project-builder/processIfc.js";

export function readIfcFile() {
  const input = document.querySelector('input[type="file"]');
  if (!input) return;
  input.addEventListener(
    "change",
    (e) => {
      readFile(input);
    },
    false
  );
}

function readFile(input) {
  const reader = new FileReader();
  reader.onload = () => {
    loadIfcFileItems(reader.result);
  };
  reader.readAsText(input.files[0]);
}
