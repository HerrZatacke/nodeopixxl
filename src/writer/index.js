// this must be the first thing to ever happen
global.CONFIG = require('../../package').projectConfig;

const WebSocket = require('ws');
const writer = require('./Writer');
const randomImage = require('./randomImage');

const wss = new WebSocket.Server({ port: 3001 });
const lastStatus = {};

wss.on('connection', (ws) => {

  ws.on('message', (messageString) => {
    const message = JSON.parse(messageString);

    Object.keys(message).forEach((action) => {
      const payload = message[action];
      switch (action) {
        case 'setImage':
          writer.setImageFile(Uint8Array.from(payload));
          break;
        case 'start':
        case 'start_delayed':
          writer.start(payload || 0);
          break;
        case 'stop':
          writer.stop();
          break;
        case 'setrandom':
          writer.setImageFile(randomImage());
          break;
        case 'loop':
          writer.setLoop(payload);
          break;
        case 'fps':
          writer.setFPS(payload);
          break;
        default:
          break;
      }
    });
  });

  ws.send(JSON.stringify(lastStatus));
});

writer.on('status', (status) => {
  Object.assign(lastStatus, status);
  wss.clients.forEach((ws) => {
    ws.send(JSON.stringify(status));
  });
});

writer.init();
