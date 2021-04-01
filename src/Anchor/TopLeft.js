import { Anchor } from "./Anchor";

export class TopLeft extends Anchor {
  /**
   * @param { Phaser.Scale.ScaleManager } scaleManager
   * @param { Phaser.GameObjects.GameObject } anchorable
   * @param {number} x X offset from top right corner
   * @param {number} y Y offset from top right corner
   */
  constructor(scaleManager, anchorable, x, y) {
    super(scaleManager, anchorable, x, y);

    anchorable.setOrigin(0, 0);
    this.on();
  }

  /**
   * @param { Phaser.Structs.Size } gameSize
   */
  onResize() {
    this.anchorable.setPosition(this.x, this.y)
  }
}