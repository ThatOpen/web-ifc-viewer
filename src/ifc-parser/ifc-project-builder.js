import IfcProject from "../ifc-models/IfcProject";
import { ifcTypes, ifcFinder } from "../ifc-utils/items-finder";
import IfcItemsReader from "./ifc-items-reader";

function buildIfcProject(loadedIfc) {
  const ifcReader = new IfcItemsReader(loadedIfc);
  const ifcData = ifcReader.readItems();
  const itemsFinder = new ifcFinder(ifcData);
  new IfcProject(itemsFinder, ifcTypes.ifcProject);
}

export default buildIfcProject;
