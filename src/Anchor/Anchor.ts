declare interface ISize {
  width: number;
  height: number;
}

declare interface IResizable {
  on(event: "resize", cb: (gameSize: ISize) => {}, context: object);
  off(event: "resize", cb: (gameSize: ISize) => {}, context: object);
}

declare interface IOriginSettable {
  setOrigin(x: number, y: number);
}

declare interface IPositionSettable {
  setPosition(x: number, y: number);
}

export abstract class Anchor {
  protected _x: number;
  protected _y: number;
  protected _resizable: IResizable & ISize;
  protected _anchorable: IOriginSettable & IPositionSettable;

  constructor(
    resizable: IResizable & ISize,
    anchorable: IOriginSettable & IPositionSettable,
    x,
    y
  ) {
    this._resizable = resizable;
    this._anchorable = anchorable;
    this._x = x;
    this._y = y;

    this.resizable.on("resize", this.onResize, this);
  }

  get resizable() {
    return this._resizable;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  abstract onResize(gameSize: ISize);

  on() {
    this.onResize(this.resizable);
    this.resizable.on("resize", this.onResize, this);
  }

  off() {
    this.resizable.off("resize", this.onResize, this);
  }
}
