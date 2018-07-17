const WebSocket = require('ws');
const writer = require('./Writer');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {

  ws.on('message', (messageString) => {
    const message = JSON.parse(messageString);

    Object.keys(message).forEach((action) => {
      const payload = message[action];
      switch(action) {
        case 'setImage':
          const imgDat = Uint8Array.from(payload);
          writer.setImageFile(imgDat);
          break;
        case 'start':
          writer.start();
          break;
        case 'stop':
          writer.stop();
          break;
        case 'fps':
          writer.setFPS(payload);
          break;
        default:
          break;
      }
    });
  });

  ws.send('hello');
});
