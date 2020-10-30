import { constructIfcProject } from "../ifc-models/ifc-spatial-structure/IfcProject";

function buildIfcProject(loadedIfc) {
  console.log(constructIfcProject(loadedIfc));
}

export default buildIfcProject;
