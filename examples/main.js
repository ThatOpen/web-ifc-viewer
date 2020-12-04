// import * as THREE from 'three';
// window.THREE = THREE;
import 'three/examples/js/controls/OrbitControls.js';

// console.log(THREE);

import './libs/smooth-zoom.js';

import * as IFC from './libs/IFC.js';

import { GUI } from './libs/dat.gui.module.js';
import Stats from './libs/stats.module.js';

const params = {
  wireframe: false
};

let camera, scene, renderer, stats;

let mouseX = 0,
  mouseY = 0;

const viewer = document.getElementById('viewer');
const { clientWidth: width, clientHeight: height } = viewer;

const loader = document.getElementById('loader');

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
  renderer.setSize(width, height);
  viewer.appendChild(renderer.domElement);

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

let model, currentHash;
onUrlChanged();

function isMobile() {
  return 'ontouchstart' in document.documentElement;
}

function onIfcLoaded(text) {
  if (scene) {
    if (model) {
      scene.remove(model);
    }
    const loaded = IFC.loadIfcFileItems(text);
    const structured = IFC.constructProject(loaded);
    model = IFC.buildGeometry(structured);
    scene.add(model);
  }
  stopLoading();
}

function loadModel(id) {
  startLoading();

  // load ifc file
  fetch(`./models/${id}.ifc`, {
    method: 'get'
  })
    .then((res) => {
      // a non-200 response code
      if (!res.ok) {
        // create error instance with HTTP status text
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }

      return res.text();
    })
    .then(onIfcLoaded)
    .catch((err) => {
      console.error(err);
    });
}

function onUrlChanged() {
  let hash = window.location.hash;
  if (!hash) {
    window.location.hash = '#building_1';
    return;
  }
  hash = hash.substring(1);
  if (currentHash == hash) return;
  currentHash = hash;
  loadModel(hash);
}

window.addEventListener('popstate', onUrlChanged);
