// import { loadIfc } from "../../build/IFC.module.js"
import { simpleBuilding } from '../ifcs/simple building.js';
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
    IFCjs.loadIfc(reader.result);
  };
  reader.readAsText(input.files[0]);
}

readIfcFile();
const loaded = IFCjs.loadIfc(simpleBuilding);
scene.add(loaded.MainObject);

var element = document.getElementById('loading');
element.parentNode.removeChild(element);
