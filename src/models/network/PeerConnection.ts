import Peer from "peerjs";
import { PEER_CONFIG } from "src/Network";
import { CONNECTION_EVENTS, IConnection } from "./IConnection";

export class PeerConnection implements IConnection {
  private _name : string = '';
  private _id : string;
  private _peer : Peer = new Peer(this.id, PEER_CONFIG);

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  constructor(name = Math.random().toString(16).slice(-8)) {
    this._name = name;
    this._peer = new Peer(this.id, PEER_CONFIG);
  }
  on(event: CONNECTION_EVENTS, cb: () => void): void {
    throw new Error("Method not implemented.");
  }
}