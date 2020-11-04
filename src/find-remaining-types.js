import { ifcTypes } from "./ifc-parser/utils/ifc-types.js";

function findRemainingTypes(items) {
  const remainingTypes = [];
  items.forEach((element) => {
    if (Object.values(ifcTypes).indexOf(element.type) < 0) {
      if (!remainingTypes.includes(element.type)) {
        remainingTypes.push(element.type);
      }
    }
  });
  console.log(remainingTypes);
}

export { findRemainingTypes };
