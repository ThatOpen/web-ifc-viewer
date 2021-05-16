import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js';
import { Component } from '../components';

export class Viewer {
    
    // We keep track of components to update
    components: Component[] = [];

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    clock: THREE.Clock;
    controls: OrbitControls;
    ifcLoader: IFCLoader;
    mouse: THREE.Vector2 = new THREE.Vector2()

    constructor(container: HTMLElement) {

        if(!container){
            throw new Error("Could not get container element!")
        }

        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        this.scene = scene;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        container.appendChild(renderer.domElement);
        this.renderer = renderer;

        const clock = new THREE.Clock(true);
        this.clock = clock;

        const controls = new OrbitControls(camera, renderer.domElement);
        this.controls = controls;

        const ifcLoader = new IFCLoader();
        this.ifcLoader = ifcLoader;

        //Scene
        scene.background = new THREE.Color(0xa9a9a9);

        //Renderer
        renderer.setSize(width, height);
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

        //Mouse position
        renderer.domElement.onmousemove = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / renderer.domElement.clientWidth) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / renderer.domElement.clientHeight) * 2 + 1;
        };

        //Window resize support
        window.addEventListener('resize', () => {
            const width = container.clientWidth;
            const height = container.clientHeight
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
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

    loadIfc = (file: File, fitToFrame: boolean = false) => {
        const url = URL.createObjectURL(file);
        try {
            this.ifcLoader.load(url, (object) => {
                object.isIFC = true;
                this.scene.add(object);
                if(fitToFrame) this.fitModelToFrame();
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

    fitModelToFrame() {
        const box = new THREE.Box3().setFromObject(this.scene.children[this.scene.children.length - 1]);
        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());

        const halfSizeToFitOnScreen = boxSize * 0.5;
        const halfFovY = THREE.MathUtils.degToRad(this.camera.fov * 0.5);
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

        const direction = new THREE.Vector3()
            .subVectors(this.camera.position, boxCenter)
            .multiply(new THREE.Vector3(1, 0, 1))
            .normalize();

        this.camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
        this.camera.updateProjectionMatrix();
        this.camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);

        // set target to newest loaded model
        this.controls.target.copy(boxCenter);
        this.controls.update();
    }
}

export interface IfcObject3D extends THREE.Object3D {
    isIFC?: boolean
    isSelected?: boolean,

}