import { getIfcProject } from "../ifc-models/ifc-spatial-structure/IfcProject";

function buildIfcProject(loadedIfc) {
  console.log(getIfcProject(loadedIfc));
}

export default buildIfcProject;
