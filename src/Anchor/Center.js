import { Anchor } from "./Anchor";

export class Center extends Anchor {
  /**
   * @param { Phaser.Scale.ScaleManager } scaleManager
   * @param { Phaser.GameObjects.GameObject } anchorable
   * @param {number} x X offset from top right corner
   * @param {number} y Y offset from top right corner
   */
  constructor(scaleManager, anchorable, x, y) {
    super(scaleManager, anchorable, x, y);

    anchorable.setOrigin(0.5, 0.5);
    this.on();
  }

  /**
   * @param { Phaser.Structs.Size } gameSize
   */
  onResize(gameSize) {
    this.anchorable
      .setPosition(
        gameSize.width * 0.5 + this.x,
        gameSize.height * 0.5 + this.y
      );
  }
}