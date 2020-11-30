import { readIfcFile } from "../../src/ifc-file-reader.js";
import { loadIfcFileItems } from "../../src/ifc-parser/ifc-services/ifc-processor.js";
import { constructProject } from "../../src/ifc-project-builder/ifc-structure-builder.js";
import { buildGeometry } from "../../src/ifc-to-three.js/converter.js";
import { simpleBuilding } from "../../resources/ifcs/simple building.js";

readIfcFile();

main(simpleBuilding);
var element = document.getElementById("loading");
element.parentNode.removeChild(element);

function main(ifcData) {
  const loaded = loadIfcFileItems(ifcData);
  const structured = constructProject(loaded);
  buildGeometry(structured);
}

export { main };
