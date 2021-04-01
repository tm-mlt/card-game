import Peer from "peerjs";
import { Network, NETWORK_EVENTS } from "../../Network";
import { SCENES } from "../keys";

export class Lobby extends Phaser.Scene {
  private _network : Network;
  private list : Array<any>;
  private listText : Array<Phaser.GameObjects.Text>;

  constructor(config?) {
    super({ key: SCENES.TEST.LOBBY, ...config });
  }

  get network() {
    return this._network;
  }

  init(config) {
    const { network } = config;
    this._network = network;
  }

  create() {
    const size = {
      width: this.game.canvas.width,
      height: this.game.canvas.height,
    }
    const center = {
      x: size.width * 0.5,
      y: size.height * 0.5,
    };

    this.list = [];
    this.listText = [];

    const id = this.add.text(30, size.height - 30, 'not connected');

    const updateId = _id => id.text = `${this.network.name}: ${_id}`;

    this.network.on(NETWORK_EVENTS.OPEN, async id => {
      updateId(id);
      const rooms = await this.network.getRooms();
      console.log(rooms);
    });
    this.network.on(NETWORK_EVENTS.CLOSE, updateId);
    this.network.on(NETWORK_EVENTS.PEERS_UPDATE, peers => this.updateList(peers));
  }

  updateList(peers) {
    peers.forEach(p => console.log(p.name));
    this.list = peers;
    this.listText.forEach(text => text.destroy());
    this.list.forEach((peer, i) => {
      this.listText.push(
        this.add
          .text(30, 30 + i * 20, `${peer.name}: ${peer.id}`)
          .setInteractive({ useHandCursor: true })
      );
    });
  }
}