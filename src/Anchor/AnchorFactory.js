import { TopRight } from "./TopRight";
import { TopLeft } from "./TopLeft";
import { BottomRight } from "./BottomRight";
import { BottomLeft } from "./BottomLeft";

export class AnchorFactory {
  /**
   * @param {Phaser.Scale.ScaleManager} scaleManager
   */
  constructor(scaleManager) {
    this._scaleManager = scaleManager;
  }

  get scaleManager() {
    return this._scaleManager;
  }

  /**
   * @private
   */
  create(constructor, anchorable, x, y) {
    return new constructor(this.scaleManager, anchorable, x, y);
  }

  topRight(anchorable, x, y) {
    return this.create(TopRight, anchorable, x, y);
  }

  topLeft(anchorable, x, y) {
    return this.create(TopLeft, anchorable, x, y);
  }

  bottomRight(anchorable, x, y) {
    return this.create(BottomRight, anchorable, x, y);
  }

  bottomLeft(anchorable, x, y) {
    return this.create(BottomLeft, anchorable, x, y);
  }
}
