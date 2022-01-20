import { Vector2 } from 'three';
import { IfcComponent } from '../../base-types';
import { IfcContext } from './context';

export class IfcMouse extends IfcComponent {
  position: Vector2;

  constructor(context: IfcContext) {
    super(context);
    this.position = new Vector2();
    this.setupMousePositionUpdate(context);
  }

  private setupMousePositionUpdate(context: IfcContext) {
    const domElement = context.getRenderer().domElement;
    domElement.onmousemove = (event: MouseEvent) => {
      const bounds = domElement.getBoundingClientRect();
      this.position.x = ((event.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
      this.position.y = -((event.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;
    };
  }
}
