const ipc = require('node-ipc');
const ws281x = require('rpi-ws281x-native');
const ipcConfig = require('./ipcConfig');

const NUM_LEDS = 160;

ws281x.init(NUM_LEDS);

// trap the SIGINT and reset before exit
process.on('SIGINT', () => {
  ws281x.reset();
  process.nextTick(() => {
    process.exit(0);
  });
});


let fps = 45;
let pixels = [[]];
let offset = 0;
let renderInterval = null;

Object.assign(ipc.config, ipcConfig);

ipc.serveNet(() => {
  ipc.server.on('nodeopixxl-imagedata', (data) => {
    pixels = data;
    console.log(`received pixels ${data.length}x${data[0].length}`);
  });

  ipc.server.on('nodeopixxl-fps', (data, socket) => {
    console.log(`newfps: ${data}`);
    fps = data;
    startAnimation(socket);
  });

  ipc.server.on('nodeopixxl-start', (data, socket) => {
    console.log('start!!!');
    startAnimation(socket);
  });

  ipc.server.on('nodeopixxl-stop', () => {
    console.log('stahpp!!');
    global.clearInterval(renderInterval);
    ws281x.render(new Uint32Array(NUM_LEDS));
  });

  ipc.server.on('socket.disconnected', () => {
    console.log('disco!');
    global.clearInterval(renderInterval);
    ws281x.render(new Uint32Array(NUM_LEDS));
  });
});

const startAnimation = (socket) => {
  global.clearInterval(renderInterval);
  renderInterval = global.setInterval(() => {

    offset = (offset + 1) % pixels.length;

    if (offset === 0) {
      ipc.server.emit(socket, 'nodeopixxl-wrap');
    }

    // too much?
    // ipc.server.emit(socket, 'nodeopixxl-index', offset);

    ws281x.render(new Uint32Array(pixels[offset]));

  }, 1000 / fps);
};

ipc.server.start();
