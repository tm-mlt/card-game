import Peer from "peerjs";
import Cookie from 'js-cookie';

const PEERS_CHECK_TIMEOUT = 2000;

export const enum NETWORK_EVENTS {
  OPEN = 'NETWORK:OPEN',
  CLOSE = 'NETWORK:CLOSE',
  CONNECTED = 'NETWORK:CONNECTED',
  DISCONNECTED = 'NETWORK:DISCONNECTED',
  ERROR = 'NETWORK:ERROR',
  PEERS_UPDATE = 'NETWORK:PEERS_UPDATE',
}

export const PEER_CONFIG : Peer.PeerJSOption = {
  host: process.env.PEER_SERVER_HOST,
  port: process.env.PEER_SERVER_PORT as unknown as number,
}

const COOKIE = {
  PEER_ID: 'peer_id'
};

function setPeerId(id) {
  Cookie.set(COOKIE.PEER_ID, id);
}

function getPeerId() {
  return Cookie.get(COOKIE.PEER_ID);
}

export class Network extends Phaser.Events.EventEmitter {
  private _name : string = '';
  private _peer : Peer;
  private _peers : Array<Peer> = [];
  private _id : string;

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this.peer.connections.forEach();
  }

  get peer() {
    return this._peer;
  }

  get peers() {
    return this._peers;
  }

  get id() {
    return this._id;
  }

  constructor(name = Math.random().toString(16).slice(-8)) {
    super();
    this._name = name;
    
    const storedId : string = getPeerId();
    if(typeof storedId !== 'undefined') {
      this._id = storedId;
    }
    this._peer = new Peer(this.id, PEER_CONFIG);
    
    this.peer.on('open', id => {
      this._id = id;
      setPeerId(id);

      this.emit(NETWORK_EVENTS.OPEN, this.id);
      this.peer.listAllPeers(peerIds => {
        this.updatePeers(peerIds);
      });
    });

    this.peer.on('connection', data => {
      console.log(data);
      const { peer, metadata } = data;
      const _peer : Peer = this.peers.find(({ id }) => id === peer);
      if(typeof _peer !== 'undefined') {
        //_peer.name = metadata.name;
        this.emit(NETWORK_EVENTS.PEERS_UPDATE, this.peers);
      }
    });

    this.peer.on('disconnected', () => console.log('Disconnected'));
    this.peer.on('error', e => { throw e; });
  }

  updatePeers(peerIds) {
    this._peers = peerIds
      .filter(id => id !== this.id)
      .map(id => {
        const existingPeer = this.peers.find(p => p.id === id);
        //if(typeof existingPeer !== 'undefined' && existingPeer.name === '') {
        //  existingPeer.name = this.peer.connections[id][0].metadata.name;
        //}
        //if(typeof existingPeer !== 'undefined' && existingPeer.open) {
        //  return existingPeer;
        //}
        const name = '';
        const connection = this.peer.connect(id, { metadata: { name: this.name } });
        return {
          id,
          name,
          connection
        }
      });
    this.emit(NETWORK_EVENTS.PEERS_UPDATE, this.peers);
    setTimeout(this.onListAllPeers.bind(this), PEERS_CHECK_TIMEOUT);
  }

  onListAllPeers() {
    this.peer.listAllPeers(this.updatePeers.bind(this));
  }

  async getRooms() {
    try {
      const response = await (
          await fetch(`http://${PEER_CONFIG.host}:${PEER_CONFIG.port}/rooms`)
        )
        .json();
      return response;
    } catch(e) {
      console.error(e);
      return [];
    }
  }
}