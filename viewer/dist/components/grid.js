"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const THREE = require("three");
const component_1 = require("./component");
class Grid extends component_1.Component {
    constructor(viewer) {
        super(viewer);
        this.grid = new THREE.GridHelper();
        this.grid.material.depthTest = false;
        this.grid.renderOrder = 1;
        viewer.scene.add(this.grid);
    }
}
exports.Grid = Grid;
//# sourceMappingURL=grid.js.map