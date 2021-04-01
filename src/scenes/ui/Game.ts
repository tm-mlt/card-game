import { SCENES } from "..";
import { Anchor } from "../../Anchor";
import { AnchorFactory } from "../../Anchor/AnchorFactory";

export class Game extends Phaser.Scene {
  constructor() {
    super({ active: true, key: SCENES.UI.GAME })
  }

  create() {
    const f = new AnchorFactory(this.scale);
    (window as any).anchoring = {
      topRight: f.topRight(
        this.add.text(0, 0, 'Top Right 20x20'),
        20,
        20,
      ),
      topLeft: new Anchor.TopLeft(
        this.scale,
        this.add.text(0, 0, 'Top Left 80x10'),
        80,
        10,
      ),
      bottomRight: new Anchor.BottomRight(
        this.scale,
        this.add.text(0, 0, 'Bottom Right 45x55'),
        45,
        55,
      ),
      bottomLeft: new Anchor.BottomLeft(
        this.scale,
        this.add.text(0, 0, 'Bottom Left 35x130'),
        35,
        130,
      ),
      center: new Anchor.Center(
        this.scale,
        this.add.text(0, 0, 'Center 0x0', { align: 'center' }),
        0,
        0,
      )
    };
  }
}