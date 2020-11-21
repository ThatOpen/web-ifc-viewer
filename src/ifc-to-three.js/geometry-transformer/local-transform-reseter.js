import { pivots as p } from "../../utils/global-constants.js";

function resetTransformData(product, property) {
  product[property] = {
    [p.locat]: [],
    [p.xAxis]: [],
    [p.yAxis]: [],
    [p.zAxis]: [],
  };
}

export { resetTransformData };
