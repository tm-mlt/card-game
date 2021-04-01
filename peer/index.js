require('dotenv').config();
const { PeerServer } = require('peer');

const log = (...args) => {
  const date = new Date().toUTCString();
  console.log(`[${date}]:`, ...args);
}

const peerServer = PeerServer({
  port: process.env.PEER_SERVER_PORT,
  allow_discovery: true,
});

const rooms = [
  'first',
  'second',
  'test',
];

peerServer.post('/rooms', (req, res) => {
  log(req.body);
});
peerServer.get('/rooms', (req, res) => {
  res.json(rooms);
});

peerServer.on('connection', (client, message) => {
  log(`connected user with id ${client.id}`);
});

peerServer.on('error', error => log(error));
