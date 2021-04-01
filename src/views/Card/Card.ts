import { Card as CardModel } from "../../models/card/";
import { localization } from "../../localization";

const CARD_ASPECT_RATIO = 1.555;

export class Card extends Phaser.GameObjects.Container {
  private maskImage: Phaser.GameObjects.Image;
  private model: CardModel;
  private textures: {
    front: Phaser.GameObjects.Image;
    back: Phaser.GameObjects.Image;
  };

  private layout: {
    cost: Phaser.GameObjects.Text;
    trigger: Phaser.GameObjects.Text;
    name: Phaser.GameObjects.Text;
    effect: Phaser.GameObjects.Text;
  };

  constructor(scene: Phaser.Scene, x: number, y: number, { textures, model }: any) {
    const front = scene.add.image(0, 0, textures.front);
    const back = scene.add.image(0, 0, textures.back);
    const image = scene.add.image(0, 0, textures.image);
    back.setVisible(false);

    super(scene, x, y, [front, back]);

    this.maskImage = scene.add.image(x, y, "card-mask").setVisible(false);

    const width = 220;
    const height = CARD_ASPECT_RATIO * width;
    this
      .setSize(width, height)
      .setDisplaySize(width, height);

    this.createLayout();
    this.model = new CardModel();

    this.textures = { front, back };
    const bitmapMask = this.maskImage.createBitmapMask();
    this.setMask(bitmapMask);
    this.setInteractive({ useHandCursor: true });
  }

  update() {
    //TODO: check mask
    //this.mask.setPosition(this.x, this.y);
  }

  setDisplaySize(width: number, height: number) {
    super.setDisplaySize(width, height);
    this.maskImage && this.maskImage.setDisplaySize
      ? this.maskImage.setDisplaySize(width, height)
      : null;
    return this;
  }

  setModel(model: CardModel) {
    this.model = model;
    const { cost, trigger, id } = model;
    this.layout.cost.text = cost > 0 ? cost.toString(10) : "";
    this.layout.name.text = localization.cards[id].name;
    //this.layout.effect.text = '';
    this.renderTrigger(trigger);
  }

  private renderTrigger(value: number | Array<number> = 0) {
    const set = (v = "") => this.layout.trigger.text = v;
    const isNumber = typeof value === "number";
    const isArray = Array.isArray(value);

    if ((!isArray && value <= 0) || (!isNumber && !isArray)) {
      set();
      return;
    }

    if (isNumber) {
      set(value.toString());
      return;
    }

    const min = Math.min(...(<Array<number>>value));
    const max = Math.max(...(<Array<number>>value));
    set(`${min} - ${max}`);
  }

  createLayout() {
    const baseStyle: Phaser.Types.GameObjects.Text.TextStyle  = {
      fontFamily: '"Reggae One", sans-serif',
    };
    const cost = this.scene.add.text(
      -this.width * 0.5 + 16,
      this.height * 0.5 - 44,
      "cost",
      { ...baseStyle, color: '#221b19', fontSize: '26px', align: "center" },
    );
    const trigger = this.scene.add.text(
      0,
      this.height * -0.5 + 22,
      "trigger",
      { ...baseStyle, fontSize: '25px' },
    );
    const name = this.scene.add.text(
      0,
      this.height * -0.5 + 65,
      "name",
      { ...baseStyle, fontSize: '20px', align: "center", color: '#386cb7' },
    );
    const effect = this.scene.add.text(
      0,
      this.height * 0.5 - 30,
      "effect",
      { ...baseStyle, align: "center", wordWrap: { width: 170 } },
    );

    trigger.setOrigin(0.5);
    name.setOrigin(0.5);
    effect.setOrigin(0.5, 1);

    this.layout = { cost, trigger, name, effect };
    this.add([...Object.values(this.layout)]);
  }
}
