export enum IfcEvent {
  onCameraReady = 'onCameraReady'
}

export type EventEndpoints = {
  [key in IfcEvent]: {
    needsUpdate: boolean;
    published: boolean;
    actions: { (): void }[];
  };
};

export class IfcEvents {
  private events: EventEndpoints = {
    [IfcEvent.onCameraReady]: {
      needsUpdate: false,
      published: false,
      actions: []
    }
  };

  dispose() {
    this.events.onCameraReady.actions.length = 0;
    (this.events as any) = null;
  }

  subscribe(event: IfcEvent, action: (...args: any) => void) {
    this.events[event].actions.push(action);
    this.events[event].needsUpdate = true;
    this.update(event);
  }

  publish(event: IfcEvent) {
    this.events[event].published = true;
    this.update(event);
  }

  update(event: IfcEvent) {
    if (this.events[event].needsUpdate && this.events[event].published) {
      const actions = this.events[event].actions;
      for (let i = 0; i < actions.length; i++) {
        actions[i]();
      }
      actions.length = 0;
    }
  }
}
