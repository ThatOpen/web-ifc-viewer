import { loadIfcFileItems } from "./ifc-parser/ifc-services/ifc-processor.js";
import { constructProject } from "./ifc-project-builder/ifc-structure-builder.js";
import { buildGeometry } from "./ifc-to-three.js/converter.js";
import { exportObj } from "./utils/obj-exporter.js";
import { mainObject } from "./ifc-to-three.js/scene/mainObject.js";

function loadIfc(ifcData) {
  const loaded = loadIfcFileItems(ifcData);
  const structured = constructProject(loaded);
  return buildGeometry(structured);
}

function exportGeometryAsObj() {
  if (mainObject) {
    return exportObj(mainObject);
  }
}

export { loadIfc, exportGeometryAsObj };
