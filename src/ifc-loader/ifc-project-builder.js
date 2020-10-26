import { getIfcProject } from "../ifc-models/ifc-spatial-structure/IfcProject";

function buildIfcProject(loadedIfc) {
  getIfcProject(loadedIfc);
}

export default buildIfcProject;
