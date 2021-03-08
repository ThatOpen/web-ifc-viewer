// import { pick } from './scene-picker.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import readIfcFile from "./ifc-file-reader"
import {
  Scene,
  AxesHelper,
  GridHelper,
  WebGLRenderer,
  PerspectiveCamera,
  Vector3,
  DirectionalLight,
  AmbientLight
} from 'three';

//Scene
var scene = new Scene();

//Camera
var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
// camera.up = new Vector3(0, 0, 1);
camera.lookAt(new Vector3(0, 0, 0));
scene.add(camera);

//Setup IFC file reader
readIfcFile(scene);

//Renderer
const canvas = document.querySelector('#c');
const width = window.innerWidth;
const height = window.innerHeight;
const pixelRatio = window.devicePixelRatio;
const heightHD = (height * pixelRatio) | 0;
const widthHD = (width * pixelRatio) | 0;
var renderer = new WebGLRenderer({ canvas });
renderer.setSize(widthHD, heightHD, false);
renderer.setClearColor(0xa9a9a9, 1);

//Axes and grids
function createAxes() {
  const axes = new AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 2; // after the grid
  return axes;
}
scene.add(createAxes());
const grid = new GridHelper(100, 100);
grid.material.depthTest = true;
grid.renderOrder = 1;
// grid.rotation.x = Math.PI / 2;
scene.add(grid);

//Light
const color = 0xffffff;
const highIntensity = 1;
const light = new DirectionalLight(color, highIntensity);
const light4 = new AmbientLight(0x707070);
light.position.set(2, 0, 4);
camera.add(light);
scene.add(light4);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed *= 2;
controls.enableDamping = true;
controls.dampingFactor *= 1.5;


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
  // pick(camera);
  renderer.render(scene, camera);
};

animate();

export { scene };
