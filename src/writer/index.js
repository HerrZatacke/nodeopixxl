const WebSocket = require('ws');
const { projectConfig: { NUM_LEDS: numLeds } } = require('../../package');

const Writer = require('./Writer');

const writerSocket = new WebSocket.Server({ port: 3001 });

const writer = new Writer({
  socket: writerSocket,
  numLeds,
});

writer.init();

module.exports = writerSocket;
