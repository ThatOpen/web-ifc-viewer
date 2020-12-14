import { loadIfc } from "../../src/IFC.js"
import { scene } from './three-scene.js';

export function readIfcFile() {
  const input = document.querySelector('input[type="file"]');
  if (!input) return;
  input.addEventListener(
    'change',
    (e) => {
      readFile(input);
    },
    false
  );
}

function readFile(input) {
  const reader = new FileReader();
  reader.onload = () => {
    const loaded = loadIfc(reader.result);
    scene.add(loaded.MainObject);
  };
  reader.readAsText(input.files[0]);
}

readIfcFile();

var element = document.getElementById('loading');
element.parentNode.removeChild(element);
