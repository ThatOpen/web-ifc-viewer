import { loadIfc } from "../../src/IFC.js";
import { simpleBuilding } from "../ifcs/simple building.js";

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
    loadIfc(reader.result);
  };
  reader.readAsText(input.files[0]);
}

readIfcFile();
loadIfc(simpleBuilding);