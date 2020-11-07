import { readIfcFile } from "./src/ifc-file-reader.js";
import { loadIfcFileItems } from "./src/ifc-parser/ifc-services/ifc-processor.js";
import { constructProject } from "./src/ifc-project-builder/ifc-structure-builder.js";

readIfcFile();

function main(ifcData) {
  console.log(loadIfcFileItems(ifcData));
  // constructProject(loaded);
}

export { main };
