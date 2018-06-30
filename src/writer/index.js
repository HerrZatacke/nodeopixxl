const fs = require('fs');
const ws281x = require('rpi-ws281x-native');
const Jimp = require('jimp');
const getPixels = require('./getPixels');

const NUM_LEDS = 160;

class Writer {

  constructor() {
    this.renderTimeout = null;
    this.loadTimeout = null;
    this.fps = 30;
    this.pixels = [[]];
    this.offset = 0;
    this.canAcceptNewImage = true;
  }

  init() {
    ws281x.init(NUM_LEDS);

// trap the SIGINT and reset before exit
    process.on('SIGINT', () => {
      ws281x.reset();
      process.nextTick(() => {
        process.exit(0);
      });
    });
  }

  setImageFile(imagePath) {
    this.stopAnimation();
    if (!this.canAcceptNewImage) {
      console.log('busy loading');
      return;
    }

    console.log(`loading file ${imagePath}`);
    this.canAcceptNewImage = false;

    // read a file after a second
    global.clearTimeout(this.loadTimeout);
    this.loadTimeout = global.setTimeout(() => {
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
          this.canAcceptNewImage = true;
        });
    }, 1000);
  }

  start() {
    console.log('start');
    this.startAnimation();
  }

  stop() {
    console.log('stop');
    this.stopAnimation();
  }

  setFPS(fps = 30) {
    console.log(`fps: ${fps}`);
    this.fps = fps;
  }


  stopAnimation() {
    global.clearTimeout(this.renderTimeout);
    this.renderTimeout = null;
    this.offset = 0;
    ws281x.render(new Uint32Array(NUM_LEDS));
  }

  startAnimation() {
    global.clearTimeout(this.renderTimeout);
    if (this.pixels.length < 2) {
      this.stopAnimation();
      return;
    }
    this.renderTimeout = global.setTimeout(() => {

      // process.stdout.write(`offset:${this.offset}  width:${this.pixels.length}  fps:${this.fps}\r`);
      console.log(`offset:${this.offset}  width:${this.pixels.length}  fps:${this.fps}`);

      ws281x.render(new Uint32Array(this.pixels[this.offset]));

      this.offset = (this.offset + 1) % this.pixels.length;

      if (this.offset !== 0) {
        this.startAnimation();
      }

    }, 1000 / this.fps);
  }
}

let writer;
const getWriter = () => {
  return writer || new Writer();
};

module.exports = getWriter();
