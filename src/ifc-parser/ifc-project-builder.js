import { getIfcProject } from "../ifc-models/IfcProject";

function buildIfcProject(loadedIfc) {
  getIfcProject(loadedIfc);
}

export default buildIfcProject;
