"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupScenePicking = void 0;
//source: https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
const scene_1 = require("../scene/scene");
const THREE = require("three");
const edges_1 = require("../display/edges");
//TODO: Use GPU picking to work toguether with clipping planes
//Source: https://stackoverflow.com/questions/41002587/three-js-clipping-and-raycasting
const selectedMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, side: THREE.DoubleSide });
let pickedItem = undefined;
function setupScenePicking() {
    const canvas = document.getElementById('three-canvas');
    canvas.onpointerdown = pick;
}
exports.setupScenePicking = setupScenePicking;
function pick(event) {
    if (event.button != 0)
        return;
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, scene_1.camera);
    const ifcObjects = [];
    scene_1.scene.children.forEach((item) => {
        if (item.isIFC && item.children) {
            ifcObjects.push(...item.children);
        }
    });
    const intersected = raycaster.intersectObjects(ifcObjects)[0];
    if (intersected) {
        if (pickedItem) {
            pickedItem.material = edges_1.edgesDisplayActive ? edges_1.whiteMaterial : pickedItem.ifcMaterial;
            pickedItem.isSelected = false;
        }
        pickedItem = intersected.object;
        if (!pickedItem.ifcMaterial)
            pickedItem.ifcMaterial = pickedItem.material;
        pickedItem.material = selectedMaterial;
        pickedItem.isSelected = true;
        const props = scene_1.ifcLoader.getPropertiesById(pickedItem.expressID);
        // updatePropertiesMenu(props.arguments);
    }
}
//# sourceMappingURL=scene-picker.js.map