import * as Stats from 'stats.js';
import { IfcComponent, Context } from '../../base-types';

export class IfcStats extends IfcComponent {
  stats: Stats;

  constructor(context: Context) {
    super(context);
    this.stats = new Stats();
    this.stats.showPanel(0);
  }

  update(_delta: number) {
    this.stats.update();
  }

  addStats(css = '') {
    if (css.length > 0) this.stats.dom.style.cssText = css;
    document.body.appendChild(this.stats.dom);
  }
}
