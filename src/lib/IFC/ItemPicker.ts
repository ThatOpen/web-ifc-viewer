import { BufferGeometry, Intersection } from "three";
import { VertexProps } from "./BaseDefinitions";
import { DisplayManager } from "./DisplayManager";

export class ItemPicker {

    private display: DisplayManager;

    constructor(displayManager: DisplayManager){
        this.display = displayManager;
    }

    pickItem(items: Intersection[], geometry: BufferGeometry, pickTransparent = true) {
        if(!geometry.index) return;
        this.display.setupVisibility(geometry);

        for (let i = 0; i < items.length; i++) {
            const index = items[i].faceIndex;
            if(!index) continue;
            const trueIndex = geometry.index.array[index * 3];
            const visible = geometry.getAttribute(VertexProps.a).array[trueIndex];
            if (pickTransparent && visible != 0) return items[i];
            else if (visible == 1) return items[i];
        }

        return null;
    }
}