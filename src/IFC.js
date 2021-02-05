import { loadIfcFileItems } from './ifc-parser/ifc-services/ifc-processor.js';
import { constructProject } from './ifc-project-builder/ifc-structure-builder.js';
import { buildGeometry } from './ifc-to-three.js/converter.js';

function loadIfc(ifcData) {
  console.time('loadIfcFileItems');
  const loaded = loadIfcFileItems(ifcData);
  console.timeEnd('loadIfcFileItems');

  console.time('constructProject');
  const structured = constructProject(loaded);
  console.timeEnd('constructProject');

  console.time('buildGeometry');
  const x = buildGeometry(structured);
  console.timeEnd('buildGeometry');

  return x;
}

export { loadIfc };
