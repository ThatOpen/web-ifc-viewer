import { Camera, Color, Material, MOUSE } from 'three';
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';
import { OrbitControl } from './components/context/camera/controls/orbit-control';
import { FirstPersonControl } from './components/context/camera/controls/first-person-control';
import { LiteEvent } from './utils/LiteEvent';
import { PlanControl } from './components/context/camera/controls/plan-control';
import { IfcContext } from './components';

export interface MouseButtons {
  left: MOUSE;
  middle: MOUSE;
  right: MOUSE;
}

export enum NavigationModes {
  Orbit,
  FirstPerson,
  Plan
}

export enum CameraProjections {
  Perspective,
  Orthographic
}

export interface NavigationMode {
  mode: NavigationModes;
  toggle: (active: boolean, options?: any) => void;
  enabled: boolean;
  onChange: LiteEvent<any>;
  onChangeProjection: LiteEvent<Camera>;
  fitModelToFrame : any
}

export interface NavModeManager {
  [NavigationModes.Orbit]: OrbitControl;
  [NavigationModes.FirstPerson]: FirstPersonControl;
  [NavigationModes.Plan]: PlanControl;
}

export interface ViewerOptions {
  container: HTMLElement;
  preselectMaterial?: Material;
  selectMaterial?: Material;
  backgroundColor?: Color;
}

interface Component {
  update: (_delta: number) => void;
}

export interface Items {
  components: Component[];
  ifcModels: IFCModel[];
  pickableIfcModels: IFCModel[];
}

export abstract class IfcComponent implements Component {
  protected constructor(context: IfcContext) {
    context.addComponent(this);
  }

  update(_delta: number) {}
}

export interface fpsControl {
  active: boolean;
  keys: string[];
}

export interface fpsControls {
  forward: fpsControl;
  back: fpsControl;
  right: fpsControl;
  left: fpsControl;
  up: fpsControl;
  down: fpsControl;
}

export enum dimension {
  x = 'x',
  y = 'y',
  z = 'z'
}
