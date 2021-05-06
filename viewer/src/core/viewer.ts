import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IfcLoader } from '../../lib/IfcLoader';
import { Component } from '../components';

export class Viewer {
    
    // We keep track of components to update
    components: Component[] = [];

    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.Renderer;
    clock: THREE.Clock;
    controls: OrbitControls;
    ifcLoader: IfcLoader;

    constructor(canvasElementId: string) {

        const canvas = document.getElementById(canvasElementId);
        
        if(!canvas){
            throw new Error("Could not get canvas element!")
        }

        const scene = new THREE.Scene();
        this.scene = scene;

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas as HTMLCanvasElement });
        this.renderer = renderer;

        const clock = new THREE.Clock(true);
        this.clock = clock;

        const controls = new OrbitControls(camera, renderer.domElement);
        this.controls = controls;

        const ifcLoader = new IfcLoader();
        this.ifcLoader = ifcLoader;

        //Scene
        scene.background = new THREE.Color(0xa9a9a9);

        //Renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.localClippingEnabled = true;

        //Camera
        camera.position.z = 8;
        camera.position.y = 8;
        camera.position.x = 8;
        // camera.up = new Vector3(0, 0, 1);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        //Controls
        controls.enableDamping = true;
        controls.dampingFactor *= 2;

        //Lights
        const light1 = new THREE.DirectionalLight(0xffeeff, 0.8);
        light1.position.set(1, 1, 1);
        scene.add(light1);

        const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
        light2.position.set(-1, 0.5, -1);
        scene.add(light2);

        const ambientLight = new THREE.AmbientLight(0xffffee, 0.25);
        scene.add(ambientLight);

        //Window resize support
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        this.render();
    }

    render = () => {
        const delta = this.clock.getDelta();
        requestAnimationFrame(this.render);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.components.forEach((component) => component.update(delta));
    };

    loadIfc = (file: File) => {
        const url = URL.createObjectURL(file);
        try {
            this.ifcLoader.load(url, (object) => {
                // @ts-expect-error
                object.isIFC = true;
                // @ts-expect-error
                this.scene.add(object);
            });
        }catch(err){
            console.error("Error loading IFC.")
            console.error(err);
        }
    }

    get ifcObjects() {
        const ifcObjects: THREE.Object3D[] = [];
        this.scene.children.forEach((item) => {
            // @ts-expect-error
            if (item.isIFC && item.children) {
                ifcObjects.push(...item.children);
            }
        });
        return ifcObjects;
    };

    addComponent = (component: Component) => {
        this.components.push(component);
    }
}

export interface IfcObject3D extends THREE.Object3D {
    isIFC?: boolean
    isSelected?: boolean,

}