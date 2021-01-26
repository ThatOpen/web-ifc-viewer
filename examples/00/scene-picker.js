//source: https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
const canvas = document.querySelector('#c');
const raycaster = new THREE.Raycaster();
let pickedObject = null;
let pickedObjectMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, side: 2 });
let pickedObjectSavedMaterial = 0;
let canUserPick = true;
const pickPosition = { x: 0, y: 0 };
clearPickPosition();

let importedIFC = {};

function enablePicking(mainObject){
  importedIFC = mainObject 
}

function pick(camera) {
  if (canUserPick && importedIFC.children) {
    if (pickedObject) {
      pickedObject.material = pickedObjectSavedMaterial;
      pickedObject = undefined;
    }

    raycaster.setFromCamera(pickPosition, camera);
    const intersectedObjects = raycaster.intersectObjects(importedIFC.children);
    if (intersectedObjects.length) {
      pickedObject = intersectedObjects[0].object;
      pickedObjectSavedMaterial = pickedObject.material;
      pickedObject.material = pickedObjectMaterial;
      console.log(pickedObject._Data);
    }
  }
  canUserPick = false;
}

function getCanvasRelativePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) * canvas.width) / rect.width,
    y: ((event.clientY - rect.top) * canvas.height) / rect.height
  };
}

function setPickPosition(event) {
  if (event.button === 0) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1; // note we flip Y
    allowPickSelection();
  }
}

function clearPickPosition() {
    pickPosition.x = -100000;
    pickPosition.y = -100000;
}


function preventPickSelection() {
  canUserPick = false;
  clearPickPosition();
}

function allowPickSelection() {
  canUserPick = true;
}

window.addEventListener('mousedown', setPickPosition);
window.addEventListener('mousemove', preventPickSelection);

window.addEventListener('touchstart', (event) => {
  // prevent the window from scrolling
  // event.preventDefault();
  setPickPosition(event.touches[0]);
});

window.addEventListener('touchmove', (event) => {
  setPickPosition(event.touches[0]);
});

window.addEventListener('touchend', clearPickPosition);

export { pick, enablePicking };
