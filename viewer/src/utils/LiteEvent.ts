// -------------------------------------------------------------------------------------------
// Credit to Jason Kleban: https://gist.github.com/JasonKleban/50cee44960c225ac1993c922563aa540
// -------------------------------------------------------------------------------------------

export interface ILiteEvent<T> {
  on(handler: T extends void ? { (): void } : { (data: T): void }): void;
  off(handler: T extends void ? { (): void } : { (data: T): void }): void;
}

export class LiteEvent<T> implements ILiteEvent<T> {
  private handlers: (T extends void ? { (): void } : { (data: T): void })[] = [];

  public on(handler: T extends void ? { (): void } : { (data: T): void }): void {
    this.handlers.push(handler);
  }

  public off(handler: T extends void ? { (): void } : { (data: T): void }): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  public trigger: T extends void ? { (): void } : { (data: T): void } = ((data?: T) => {
    // @ts-ignore
    this.handlers.slice(0).forEach((h) => h(data));
  }) as any;

  public expose(): ILiteEvent<T> {
    return this;
  }
}
