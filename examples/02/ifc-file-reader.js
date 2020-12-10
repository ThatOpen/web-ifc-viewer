import { loadIfc } from "../../build/IFC.module.js"
import { simpleBuilding2 } from '../models/simple building 2.js';
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
    const loaded = IFCjs.loadIfc(reader.result);
    scene.add(loaded.MainObject);
  };
  reader.readAsText(input.files[0]);
}

readIfcFile();
const loaded = loadIfc(simpleBuilding2);
scene.add(loaded.MainObject);

var element = document.getElementById('loading');
element.parentNode.removeChild(element);
