import * as THREE from 'three';

window.THREE = THREE;

import { readIfcFile } from './ifc-file-reader.js';
import { loadIfcFileItems } from './ifc-parser/ifc-services/ifc-processor.js';
import { constructProject } from './ifc-project-builder/ifc-structure-builder.js';
import { buildGeometry } from './ifc-to-three.js/converter.js';

// readIfcFile();

// var element = document.getElementById('loading');
// element.parentNode.removeChild(element);

// function main(ifcData) {
//   const loaded = loadIfcFileItems(ifcData);
//   const structured = constructProject(loaded);
//   buildGeometry(structured);
// }

export { loadIfcFileItems, constructProject, buildGeometry, readIfcFile };
