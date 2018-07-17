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
          if (!writer.isRunning) {
            const imgDat = Uint8Array.from(payload);
            console.log(payload.length, imgDat.length);
            writer.setImageFile(imgDat);
          }
          break;
        case 'start':
          writer.start();
          break;
        case 'stop':
          writer.stop();
          break;
        case 'fps':
          if (payload) {
            writer.setFPS(payload);
          }
          break;
        default:
          break;
      }
    });
  });

  ws.send('hello');
});
