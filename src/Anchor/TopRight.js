import { Anchor } from "./Anchor";

export class TopRight extends Anchor {
  /**
   * @param { Phaser.Scale.ScaleManager } scaleManager
   * @param { Phaser.GameObjects.GameObject } anchorable
   * @param {number} x X offset from top right corner
   * @param {number} y Y offset from top right corner
   */
  constructor(scaleManager, anchorable, x, y) {
    super(scaleManager, anchorable, x, y);

    anchorable.setOrigin(1, 0);
    this.on();
  }

  /**
   * @param { Phaser.Structs.Size } gameSize
   */
  onResize(gameSize) {
    this.anchorable.setPosition(gameSize.width - this.x, this.y)
  }
}