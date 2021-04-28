export default class Component {

    constructor(viewer){
        viewer.addComponent(this);
        this.viewer = viewer;
    }

    update(delta) {}
}