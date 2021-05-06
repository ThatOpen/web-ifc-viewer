"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whiteMaterial = exports.edgesDisplayActive = exports.setupEdgesDisplay = void 0;
const THREE = require("three");
const gui_creator_1 = require("../gui/gui-creator");
const scene_1 = require("../scene/scene");
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x555555 });
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
exports.whiteMaterial = whiteMaterial;
const invisibleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0
});
let edgesDisplayActive = false;
exports.edgesDisplayActive = edgesDisplayActive;
//TODO: Merge all wireframes in single object
//TODO: Create all wireframes on init async
function setupEdgesDisplay() {
    const button = gui_creator_1.createSideMenuButton('./resources/wireframe-cube.svg');
    button.addEventListener('click', () => {
        button.blur();
        edgesDisplayActive ? deactivateEdgeDisplay() : activateEdgeDisplay();
    });
}
exports.setupEdgesDisplay = setupEdgesDisplay;
function activateEdgeDisplay() {
    exports.edgesDisplayActive = edgesDisplayActive = true;
    scene_1.scene.children.forEach((object) => {
        object.children.forEach((item) => {
            if (item.type === 'Mesh') {
                if (!item.ifcMaterial)
                    item.ifcMaterial = item.material;
                item.wireframe ? (item.wireframe.visible = true) : (item.wireframe = getEdges(item));
                item.add(item.wireframe);
                if (!item.isSelected)
                    item.material = item.material.transparent ? invisibleMaterial : whiteMaterial;
            }
        });
    });
}
function deactivateEdgeDisplay() {
    exports.edgesDisplayActive = edgesDisplayActive = false;
    scene_1.scene.children.forEach((object) => {
        object.children.forEach((item) => {
            if (item.type === 'Mesh') {
                if (item.wireframe)
                    item.wireframe.visible = false;
                if (!item.isSelected)
                    item.material = item.ifcMaterial;
            }
        });
    });
}
function getEdges(item) {
    const geometry = new THREE.EdgesGeometry(item.geometry);
    const material = lineMaterial;
    return new THREE.LineSegments(geometry, material);
}
//# sourceMappingURL=edges.js.map