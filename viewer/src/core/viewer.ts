import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Component } from '../components';
import { getBasisTransform } from '../utils/ThreeUtils';
import { VisualizationInfo } from '@parametricos/bcf-js';
import { IFCLoader } from '../lib/IFCLoader';

export interface ViewerOptions {
    backgroundColor?: THREE.Color
}

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

    ifc_objects: THREE.Object3D[] = []

    constructor(container: HTMLElement, options?: ViewerOptions) {

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
        scene.background = options?.backgroundColor || new THREE.Color(0xa9a9a9);

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

    loadIfc = async (file: File, fitToFrame: boolean = false) => {
        const url = URL.createObjectURL(file);
        try {
            const object = await this.ifcLoader.loadAsync(url);
            this.ifc_objects.push(object);
            // @ts-ignore
            this.scene.add(object);
            if(fitToFrame) this.fitModelToFrame();
        }catch(err){
            console.error("Error loading IFC.")
            console.error(err);
        }
    }

    get ifcObjects() {
        return this.ifc_objects;
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

    set currentViewpoint(viewpoint: VisualizationInfo) {

        if(viewpoint.perspective_camera) {
            const { camera_view_point, camera_direction, field_of_view } = viewpoint.perspective_camera;

            const matrix = new THREE.Matrix4();
            getBasisTransform("+X+Z-Y", "+X+Y+Z", matrix);

            //Left handed Z up => Right handed Y up
            const position = new THREE.Vector3(camera_view_point.x, camera_view_point.y, camera_view_point.z);
            const direction = new THREE.Vector3(camera_direction.x, camera_direction.y, camera_direction.z);
            position.applyMatrix4(matrix);
            direction.applyMatrix4(matrix);

            this.controls.object.position.set(position.x, position.y, position.z);

            const ray = new THREE.Ray(position, direction);
            const target = new THREE.Vector3();
            ray.at(5, target);
            this.controls.target = new THREE.Vector3(target.x, target.y, target.z);
            this.controls.update();
            // this.camera.up.set(camera_up_vector.x, camera_up_vector.z, -camera_up_vector.y);
            this.camera.fov = field_of_view;
        }
    }

    takeScreenshot = () => {
        this.render();
        return this.renderer.domElement.toDataURL("image/png");
    }
}

export interface IfcObject3D extends THREE.Object3D {
    isIFC?: boolean
    isSelected?: boolean,
}