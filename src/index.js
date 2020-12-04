import { readIfcFile } from './ifc-file-reader.js';
import { loadIfcFileItems } from './ifc-parser/ifc-services/ifc-processor.js';
import { constructProject } from './ifc-project-builder/ifc-structure-builder.js';
import { buildGeometry } from './ifc-to-three.js/converter.js';

const VERSION = '1.0.1';
// readIfcFile();

// var element = document.getElementById('loading');
// element.parentNode.removeChild(element);

// function main(ifcData) {
//   const loaded = loadIfcFileItems(ifcData);
//   const structured = constructProject(loaded);
//   buildGeometry(structured);
// }

export { VERSION as version, loadIfcFileItems, constructProject, buildGeometry, readIfcFile };
