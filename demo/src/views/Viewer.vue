<template>
  <div id="viewer" v-loading="loading"></div>
</template>

<script>
import * as THREE from 'three';
window.THREE = THREE;

import '@/libs/smooth-zoom.js';

import { constructProject, buildGeometry, loadIfcFileItems } from 'ifc.js/dist/IFC.es.js';

export default {
  name: 'Viewer',

  data() {
    return {
      loading: true
    };
  },

  mounted() {
    this.initViewer();
    this.loadModel();
  },

  unmounted() {
    // if (this.scene) {
    //   this.scene.dispose();
    // }
    this.$el.innerHTML = '';
  },

  methods: {
    async loadModel() {
      const vm = this;
      this.loading = true;

      fetch(`/assets/models/${this.$route.params.id}.ifc`, {
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
        .then(vm.onIfcLoaded)
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          vm.loading = false;
        });
    },

    onIfcLoaded(text) {
      const loaded = loadIfcFileItems(text);
      const structured = constructProject(loaded);
      buildGeometry(structured);
    },

    initViewer() {
      // readIfcFile();

      const Preset = { ASSET_GENERATOR: 'assetgenerator' };

      Cache.enabled = true;

      const DEFAULT_CAMERA = '[default]';

      const state = {
        background: false,
        playbackSpeed: 1.0,
        actionStates: {},
        camera: DEFAULT_CAMERA,
        wireframe: false,
        skeleton: false,
        grid: false,

        // Lights
        addLights: true,
        exposure: 1.0,
        textureEncoding: 'sRGB',
        ambientIntensity: 0.3,
        ambientColor: 0xffffff,
        directIntensity: 0.8 * Math.PI, // TODO(#116)
        directColor: 0xffffff,
        bgColor1: '#ffffff',
        bgColor2: '#353535'
      };

      //Renderer
      const el = this.$el;
      const height = el.clientHeight;
      const width = el.clientWidth;

      //Scene
      var scene = new THREE.Scene();
      this.scene = scene;
      //Camera
      var camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000);
      camera.position.z = 5;
      camera.position.y = 5;
      camera.position.x = 5;
      camera.up = new THREE.Vector3(0, 0, 1);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      const pixelRatio = window.devicePixelRatio;
      var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.physicallyCorrectLights = true;
      // renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setClearColor(0xcccccc);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      el.appendChild(renderer.domElement);

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

      //TODO: Adjust light to avoid planes too bright / dark on any angle
      //Light
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

      // const vignette = createBackground({
      //   aspect: camera.aspect,
      //   grainScale: IS_IOS ? 0 : 0.001, // mattdesl/three-vignette-background#1
      //   colors: [state.bgColor1, state.bgColor2]
      // });
      // vignette.name = 'Vignette';
      // vignette.renderOrder = -1;w

      // scene.add(vignette);

      // smooth Zoom
      const onMobile = isMobile();
      let controls = {};
      if (onMobile) {
        controls = new OrbitControls(camera, renderer.domElement);
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

      //Autoadjust camera to window size
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          // vignette.style({ aspect: camera.aspect });
        }
      }

      //Update
      var animate = function () {
        requestAnimationFrame(animate);

        controls.update();

        resizeRendererToDisplaySize(renderer);

        renderer.render(scene, camera);
      };

      function isMobile() {
        return 'ontouchstart' in document.documentElement;
      }

      animate();

      this.loading = false;
    }
  }
};
</script>
<style lang="scss">
#viewer {
  width: 100%;
  height: 100%;
}
</style>
