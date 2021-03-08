import { IFCLoader } from '../lib/jsm/IfcLoader.js';

export default function readIfcFile(scene) {
  const input = document.querySelector('input[type="file"]');
  if (!input) return;
  input.addEventListener(
    'change',
    (changed) => {
      var ifcURL = URL.createObjectURL(changed.target.files[0]);
      const ifcLoader = new IFCLoader();
      ifcLoader.load(ifcURL, (geometry) => scene.add(geometry));
    },
    false
  );
};