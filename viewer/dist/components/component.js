"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    constructor(viewer) {
        viewer.addComponent(this);
        this.viewer = viewer;
    }
    update(_delta) { }
    ;
}
exports.Component = Component;
//# sourceMappingURL=component.js.map