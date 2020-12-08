import { loadIfcFileItems } from "./ifc-parser/ifc-services/ifc-processor.js";
import { constructProject } from "./ifc-project-builder/ifc-structure-builder.js";
import { buildGeometry } from "./ifc-to-three.js/converter.js";

var element = document.getElementById("loading");
element.parentNode.removeChild(element);

function loadIfc(ifcData) {
  const loaded = loadIfcFileItems(ifcData);
  const structured = constructProject(loaded);
  buildGeometry(structured);
}

export { loadIfc };
