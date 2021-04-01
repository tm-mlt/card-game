import { Player } from "../../models/player/";
import { Balance } from "../../models/balance";
import { SCENES } from "../keys";

export class Test extends Phaser.Scene {
  private _players: Array<Player>;

  constructor(config?) {
    super({ key: SCENES.TEST.TEST, ...config });
  }

  create() {
    this._players = [
      new Player({ name: "Andrey", balance: new Balance(19) } as unknown as Player),
      new Player(<Player>{ name: "Gunya" }),
    ];
  }
}
