<template>
  <div class="viewer" v-loading="loading">
    <canvas />
    <el-upload class="file-uploader" :before-upload="beforeUpload" :file-list="fileList">
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">Only .ifc files are supported</div>
    </el-upload>
  </div>
</template>

<script>
import * as THREE from 'three';
window.THREE = THREE;

import '@/libs/smooth-zoom.js';

import { constructProject, buildGeometry, loadIfcFileItems, readIfcFile } from 'ifc.js';

export default {
  name: 'Uploader',

  data() {
    return {
      loading: true
    };
  },

  mounted() {
    this.initViewer();
    // this.loadModel();
  },

  unmounted() {
    // if (this.scene) {
    //   this.scene.dispose();
    // }
    if (this.canvas) {
      this.canvas.innerHTML = '';
    }
  },

  methods: {
    beforeUpload(file) {
      readIfcFile(file, this.onIfcLoaded);
      return true;
    },

    async loadModel() {
      // load ifc file
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
        .then(this.onIfcLoaded)
        .catch((err) => {
          console.error(err);
        });
    },

    onIfcLoaded(text) {
      const loaded = loadIfcFileItems(text);
      const structured = constructProject(loaded);
      const model = buildGeometry(structured);
      if (this.scene) {
        this.scene.add(model);
      }
      this.loading = false;
    },

    initViewer() {
      // readIfcFile();

      const vm = this;

      //Renderer
      this.canvas = this.$el.querySelector('canvas');
      const height = this.canvas.clientHeight;
      const width = this.canvas.clientWidth;

      //Scene
      var scene = new THREE.Scene();
      this.scene = scene;
      //Camera
      var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;
      camera.position.y = 5;
      camera.position.x = 5;
      camera.up = new THREE.Vector3(0, 0, 1);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      const pixelRatio = window.devicePixelRatio;
      var renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
      // renderer.physicallyCorrectLights = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setClearColor(0xcccccc);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      //el.appendChild(renderer.domElement);

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
      function resizeRendererToDisplaySize() {
        const canvas = renderer.domElement;
        const width = vm.$el.clientWidth;
        const height = vm.$el.clientHeight;
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

        // resizeRendererToDisplaySize(renderer);

        renderer.render(scene, camera);
      };

      function isMobile() {
        return 'ontouchstart' in document.documentElement;
      }

      window.addEventListener('resize', resizeRendererToDisplaySize);

      animate();

      this.loading = false;
    }
  }
};
</script>
<style lang="scss">
.viewer {
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
  }

  .file-uploader {
    position: absolute;
    top: 20px;
    left: 20px;
  }
}
</style>
