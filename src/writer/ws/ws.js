const WebSocket = require('ws');
const writer = require('../index');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {

  ws.on('message', (message) => {
    console.log('received: %s', message.length);

    if (!writer.isRunning && message.length) {
      const imgDat = Uint8Array.from(JSON.parse(message));
      console.log(message.length, imgDat.length);
      writer.setImageFile(imgDat);
    }

  });

  ws.send('hello');
});
