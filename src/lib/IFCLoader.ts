import { IFCManager } from './IFC/IFCManager';
import { BufferGeometry, FileLoader, Intersection, Loader, LoadingManager, Mesh, Object3D, Scene } from 'three';
import { Display } from './IFC/BaseDefinitions';

// tslint:disable-next-line:interface-name
export interface IFC extends Object3D {
    [key: string]: any;
}

class IFCLoader extends Loader {
    private ifcManager;

    constructor(manager?: LoadingManager) {
        super(manager);
        this.ifcManager = new IFCManager();
    }

    load(url: any, onLoad: (ifc: IFC) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void) {
        const scope = this;

        const loader = new FileLoader(scope.manager);
        loader.setPath(scope.path);
        loader.setResponseType('arraybuffer');
        loader.setRequestHeader(scope.requestHeader);
        loader.setWithCredentials(scope.withCredentials);
        loader.load(
            url,
            async function (buffer) {
                try {
                    onLoad(await scope.parse(buffer));
                } catch (e) {
                    if (onError) {
                        onError(e);
                    } else {
                        console.error(e);
                    }

                    scope.manager.itemError(url);
                }
            },
            onProgress,
            onError
        );
    }

    parse(buffer: any) {
        return this.ifcManager.parse(buffer);
    }

    /**
     * Sets the relative path of web-ifc.wasm file in the project.
     * Beware: you **must** serve this file in your page; this means
     * that you have to copy this files from *node_modules/web-ifc*
     * to your deployment directory.
     *
     * If you don't use this methods,
     * IFC.js assumes that you are serving it in the root directory.
     *
     * Example if web-ifc.wasm is in dist/wasmDir:
     * ```js
     * ifcLoader.setWasmPath("dist/wasmDir/");
     * ```
     *
     * @path The relative path to web-ifc.wasm.
     */
    setWasmPath(path: string) {
        this.ifcManager.setWasmPath(path);
    }

    /**
     * Gets the **Express ID** to which the given face belongs.
     * This ID uniquely identifies this entity within this IFC file.
     * @faceIndex The index of the face of a geometry.You can easily get this index using the [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster).
     */
    getExpressId(faceIndex: number) {
        return this.ifcManager.getExpressId(faceIndex);
    }

    /**
     * Returns the first visible or transparent Intersection of the given array.
     * If you you use the
     * [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster), you will
     * get an array of Intersections, and you probably want to get the closest
     * intersection to the camera. This is complex because due to the geometry
     * optimizations of IFC.js. Use this method to get it right away.
     * @items The items you get with [raycaster.intersectObjects()](https://threejs.org/docs/#api/en/core/Raycaster.intersectObjects).
     * @geometry The geometry of the IFC model.
     * @all If true, it picks the translucent items as well.
     *
     */
    pickItem(items: Intersection[], geometry: BufferGeometry, transparent = true) {
        return this.ifcManager.pickItem(items, geometry, transparent);
    }

    /**
     * Sets the RGB color and transparency of the specified items.
     * @ids The items whose visibility to change.
     * @mesh The mesh of the IFC model.
     * @state The state of view to apply. This is an object of type `Display`, which has the properties `r`, `g` and `b`(red, green and blue), which can have a value between 0 (pure black) and 1 (pure color); `a` (alfa), which can have a value between 0 * (transparent) and 1 (opaque), and `h` (highlighted), which can be either 0 (not highlighted) * or 1 (highlighted). Only highlighted elements will display the specified color + transparency.
     * @scene The current Three scene.
     */
    setItemsDisplay(ids: number[], mesh: Mesh, state: Display, scene: Scene) {
        this.ifcManager.setItemsDisplay(ids, mesh, state, scene);
    }

    /**
     * Gets the native properties of the given element.
     * @id The express ID of the element.
     * @recursive Wether you want to get the information of the referenced elements recursively.
     */
    getItemProperties(id: number, recursive = false) {
        return this.ifcManager.getItemProperties(id, recursive);
    }

    /**
     * Gets the [property sets](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifckernel/lexical/ifcpropertyset.htm)
     * assigned to the given element.
     * @id The express ID of the element.
     * @recursive Wether you want to get the information of the referenced elements recursively.
     */
    getPropertySets(id: number, recursive = false) {
        return this.ifcManager.getPropertySets(id, recursive);
    }

    /**
     * Gets the properties of the type assigned to the element.
     * For example, if applied to a wall (IfcWall), this would get back the information
     * contained in the IfcWallType assigned to it, if any.
     * @id The express ID of the element.
     * @recursive Wether you want to get the information of the referenced elements recursively.
     */
    getTypeProperties(id: number, recursive = false) {
        return this.ifcManager.getTypeProperties(id, recursive);
    }

    /**
     * Gets the spatial structure of the project. The
     * [spatial structure](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcproductextension/lexical/ifcspatialstructureelement.htm)
     * is the hierarchical structure that organizes every IFC project (all physical items
     * are referenced to an element of the spatial structure). It is formed by
     * one IfcProject that contains one or more IfcSites, that contain one or more
     * IfcBuildings, that contain one or more IfcBuildingStoreys, that contain
     * one or more IfcSpaces.
     */
    getSpatialStructure() {
        return this.ifcManager.getSpatialStructure();
    }
}

export { IFCLoader };
