const fs = require('fs');
const ipc = require('node-ipc');
const ws281x = require('rpi-ws281x-native');
const Jimp = require('jimp');
const ipcConfig = require('./ipcConfig');
const getPixels = require('./getPixels');

const NUM_LEDS = 160;

ws281x.init(NUM_LEDS);

// trap the SIGINT and reset before exit
process.on('SIGINT', () => {
  ws281x.reset();
  process.nextTick(() => {
    process.exit(0);
  });
});


Object.assign(ipc.config, ipcConfig);

class Service {
  constructor() {
    this.socket = null;
    this.renderTimeout = null;
    this.fps = 30;
    this.pixels = [[]];
    this.offset = 0;
  }

  start() {
    ipc.serveNet(() => {

      ipc.server.on('nodeopixxl-imagefile', (imagePath) => {
        this.stopAnimation();

        // read a file after a 2 frame delay
        setTimeout(() => {
          Jimp.read(imagePath)
            .then((image) => {
              this.pixels = getPixels(image.bitmap);
              console.log(`received pixels ${this.pixels.length}x${this.pixels[0].length}`);
            })
            .catch((err) => {
              console.log(err.message);
            })
            .then((image) => {
              fs.unlinkSync(imagePath);
            });
        }, 500 / this.fps);

      });

      ipc.server.on('nodeopixxl-fps', (fps, socket) => {
        console.log(`fps: ${fps}`);
        this.fps = fps;
      });

      ipc.server.on('nodeopixxl-start', (data, socket) => {
        console.log('start');
        this.startAnimation(socket);
      });

      ipc.server.on('nodeopixxl-stop', () => {
        console.log('stop');
        this.stopAnimation();
      });

      ipc.server.on('socket.disconnected', () => {
        console.log('socket.disconnected');
        this.stopAnimation();
      });

      ipc.server.on('connect', () => {
        console.log('connect');
      });
    });
    ipc.server.start();
  }

  stopAnimation() {
    global.clearTimeout(this.renderTimeout);
    this.renderTimeout = null;
    this.offset = 0;
    process.stdout.write('\r\n');
    ws281x.render(new Uint32Array(NUM_LEDS));
  }

  startAnimation(socket) {
    global.clearTimeout(this.renderTimeout);
    if (this.pixels.length < 2) {
      this.stopAnimation();
      return;
    }
    this.renderTimeout = global.setTimeout(() => {

      process.stdout.write(`offset:${this.offset}  width:${this.pixels.length}  fps:${this.fps}\r`);
      ws281x.render(new Uint32Array(this.pixels[this.offset]));

      this.offset = (this.offset + 1) % this.pixels.length;

      if (this.offset !== 0) {
        this.startAnimation();
      }

    }, 1000 / this.fps);
  }
}



const service = new Service();
service.start();
