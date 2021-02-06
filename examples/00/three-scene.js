import { pick } from './scene-picker.js';

//Scene
var scene = new THREE.Scene();
//Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
camera.up = new THREE.Vector3(0, 0, 1);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

//Renderer
const canvas = document.querySelector('#c');
const width = window.innerWidth;
const height = window.innerHeight;
const pixelRatio = window.devicePixelRatio;
const heightHD = (height * pixelRatio) | 0;
const widthHD = (width * pixelRatio) | 0;
var renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(widthHD, heightHD, false);
renderer.setClearColor(0xa9a9a9, 1);

//Axes and grids
function createAxes() {
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 2; // after the grid
  return axes;
}
scene.add(createAxes());
const grid = new THREE.GridHelper(100, 100);
grid.material.depthTest = true;
grid.renderOrder = 1;
grid.rotation.x = Math.PI / 2;
scene.add(grid);

//Light
const color = 0xffffff;
const highIntensity = 1;
const light = new THREE.DirectionalLight(color, highIntensity);
const light4 = new THREE.AmbientLight(0x707070);
light.position.set(2, 0, 4);
camera.add(light);
scene.add(light4);

// smooth Zoom
const onMobile = isMobile();
let controls = {};
if (onMobile) {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
} else {
  controls = new THREE.OOrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.constraint.smoothZoom = true;
  controls.constraint.zoomDampingFactor = 0.2;
  controls.constraint.smoothZoomSpeed = 5.0;
  controls.rotateSpeed = 0.5;
}

//Autoadjust camera to window size
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

//Update
var animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  resizeRendererToDisplaySize(renderer);
  pick(camera);
  renderer.render(scene, camera);
};

function isMobile() {
  return 'ontouchstart' in document.documentElement;
}

animate();

export { scene };
