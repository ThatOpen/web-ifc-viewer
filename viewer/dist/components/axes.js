"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axes = void 0;
const THREE = require("three");
const component_1 = require("./component");
class Axes extends component_1.Component {
    constructor(viewer, size) {
        super(viewer);
        this.axes = new THREE.AxesHelper(size);
        this.axes.material.depthTest = false;
        this.axes.renderOrder = 2;
        viewer.scene.add(this.axes);
    }
}
exports.Axes = Axes;
//# sourceMappingURL=axes.js.map