import type { IDice } from "./IDice";

interface Tuple<T extends number, L extends number> extends Array<number> {
  0?: T;
  length: L;
}

abstract class AbstractDice<T extends number, B extends Tuple<number, T>> implements IDice<B> {
  protected _length: T;
  protected _last: B;

  protected static SIDES: number = 6;

  get last(): B {
    return this._last;
  }

  get value() {
    if(this._last.length < 2) {
      return this.last[0];
    }
    return this._last.reduce((prev, current) => prev += current, 0);
  }

  constructor() {
    this._last = new Array<number>(this._length).fill(0) as B;
  }

  protected getNewValue() {
    return Math.ceil(Math.random() * AbstractDice.SIDES);
  }

  abstract roll(): B;
}


export class SingleDice extends AbstractDice<1, Tuple<number, 1>> {
  roll() {
    this._last[0] = this.getNewValue();
    return this.last;
  }
}

export class DoubleDice extends AbstractDice<2, Tuple<number, 2>> {
  roll() {
    this._last[0] = this.getNewValue();
    this._last[1] = this.getNewValue();
    return this.last;
  }
}
