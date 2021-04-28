import { setupClippingPlanes } from './display/clipping-planes';
import { setupEdgesDisplay } from './display/edges';
import { setupIfcReader } from './files/file-loader';
import { setupIfcPropertiesMenu } from './gui/ifc-properties-menu';
import { setupThreeScene } from './scene/scene';
import { setupScenePicking } from './select-edit/scene-picker';

setupThreeScene();
// setupIfcPropertiesMenu();
setupIfcReader();
setupEdgesDisplay();
setupScenePicking();
setupScenePicking();
setupClippingPlanes();