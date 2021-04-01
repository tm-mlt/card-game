import { IBalance } from "./IBalance";

export class Balance implements IBalance {
  private _value;
  get value() {
    return this._value;
  }

  constructor(initial = 0) {
    this._value = initial;
  }

  give(delta: number) {
    if (delta < 0) {
      throw new Error(`Balance delta should be positive, got ${delta}`);
    }
    this._value = Math.max(0, this._value + delta);
  }

  take(delta: number) {
    if (delta < 0) {
      throw new Error(`Balance delta should be positive, got ${delta}`);
    }
    const rest = Math.min(this._value, delta);
    this._value = Math.max(0, this._value - rest);
    return rest;
  }

  clear() {
    this._value = 0;
  }
}
