// import * as THREE from '../libs/three.module.js';
// import * as chevrotain from '../libs/chevrotain.min.js';
// window.THREE = THREE;
// window.chevrotain = chevrotain;

// import '../libs/OrbitControls.js';

// console.log(THREE);

// import '../libs/smooth-zoom.js';

import * as IFC from '../../build/IFC.module.js';
window.IFC = IFC;

console.info('three.js v0.' + THREE.REVISION);
console.info('IFC.js v' + IFC.version);

import { GUI } from '../libs/dat.gui.module.js';
import Stats from '../libs/stats.module.js';

const params = {
  wireframe: false
};

let camera, scene, renderer, stats;

let mouseX = 0,
  mouseY = 0;

const viewer = document.getElementById('viewer');
const { clientWidth: width, clientHeight: height } = viewer;

const loader = document.getElementById('loader');
const uploader = document.getElementById('uploader');

init();

animate();

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 10;
  camera.position.y = 10;
  camera.position.x = 10;
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xcccccc);
  renderer.setSize(width, height);
  viewer.appendChild(renderer.domElement);

  // Axes
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 2; // after the grids
  scene.add(axes);

  // grids
  const grid = new THREE.GridHelper(100, 100);
  grid.material.depthTest = true;
  grid.renderOrder = 1;
  grid.rotation.x = Math.PI / 2;
  scene.add(grid);

  // smooth Zoom
  const onMobile = isMobile();
  let controls = {};
  if (!onMobile) {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
  } else {
    controls = new THREE.OOrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.constraint.smoothZoom = true;
    controls.constraint.zoomDampingFactor = 0.2;
    controls.constraint.smoothZoomSpeed = 5.0;
    controls.rotateSpeed = 0.5;
    controls.target.set = new THREE.Vector3(0, 0, 0);
  }

  // Light
  const color = 0xffffff;
  const highIntensity = 1;
  const lowIntensity = 0.5;
  const light = new THREE.DirectionalLight(color, highIntensity);
  const light2 = new THREE.DirectionalLight(color, lowIntensity);
  const light3 = new THREE.DirectionalLight(color, highIntensity);
  const light4 = new THREE.AmbientLight(0x303030);
  light.position.set(-2, 2, 4);
  light2.position.set(4, 3, -2);
  light3.position.set(4, -3, -2);
  scene.add(light);
  scene.add(light2);
  scene.add(light3);
  scene.add(light4);

  //
  stats = new Stats();
  viewer.appendChild(stats.dom);
  stats.dom.style.position = 'absolute';

  //
  window.addEventListener('resize', onWindowResize, false);

  //
  const gui = new GUI();
  gui.add(params, 'wireframe').name('Wireframe');
}

function onWindowResize() {
  windowHalfX = width / 2;
  windowHalfY = height / 2;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

function startLoading() {
  loader.style.display = 'block';
}

function stopLoading() {
  loader.style.display = 'none';
}

function showUploader() {
  uploader.style.display = 'block';
}

function hideUploader() {
  uploader.style.display = 'none';
}

uploader.addEventListener('change', function (e) {
  IFC.readIfcFile(e.target.files[0], onIfcLoaded);
});

let model, currentHash;
onUrlChanged();

function isMobile() {
  return 'ontouchstart' in document.documentElement;
}

function onIfcLoaded(text) {
  console.log(text);
  if (scene) {
    if (model) {
      model.MainObject.children = [];
      scene.remove(model.MainObject);
    }
    model = IFC.loadIfc(text);
    scene.add(model.MainObject);
    window.scene = scene;
  }
  stopLoading();
}

function loadText(url, cb) {
  var client = new XMLHttpRequest();
  client.open('GET', url);
  client.onreadystatechange = function () {
    if (cb) {
      cb(client.responseText);
    }
  };
  client.send();
}

async function loadModel(id) {
  startLoading();

  // load ifc file
  loadText(`../models/${id}.ifc`, (text) => {
    onIfcLoaded(text);
  });
}

function onUrlChanged() {
  let hash = window.location.hash;

  if (!hash) {
    showUploader();
    stopLoading();
    return;
  }
  hideUploader();
  hash = hash.substring(1);
  if (currentHash == hash) return;
  currentHash = hash;
  loadModel(hash);
}

window.addEventListener('popstate', onUrlChanged);
