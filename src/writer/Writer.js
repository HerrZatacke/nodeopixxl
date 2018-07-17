const fs = require('fs');
const chalk = require('chalk');
// const ws281x = require('rpi-ws281x-native');
const OPC = require('./opc');
const int2rgb = require('./int2rgb');
const getPixels = require('./getPixels');

const NUM_LEDS = 160;

const allBlack = new Uint32Array(NUM_LEDS);

class Writer {

  constructor() {
    this.renderTimeout = null;
    this.loadTimeout = null;
    this.fps = 30;
    this.pixels = [[]];
    this.offset = 0;
    this.canAcceptNewImage = true;
    this.isRunning = false;
    this.init();
  }

  init() {
    // ws281x.init(NUM_LEDS);
    // trap the SIGINT and reset before exit
    process.on('SIGINT', () => {
      // ws281x.reset();
      this.setColumn(allBlack);
      process.nextTick(() => { process.exit(0); });
    });

    this.client = new OPC('localhost', 7890);

    this.setColumn(allBlack)
  }

  setImageFile(imageData) {
    if (this.isRunning) {
      console.log('running');
      return;
    }

    this.stopAnimation();

    if (!this.canAcceptNewImage) {
      console.log('busy loading');
      return;
    }
    this.canAcceptNewImage = false;

    console.log(`loading image with ${imageData.length / 3} single pixels`);

    // read a file after a second
    global.clearTimeout(this.loadTimeout);
    this.loadTimeout = global.setTimeout(() => {
      this.pixels = getPixels(imageData);
      console.log(`received pixels ${this.pixels.length}x${this.pixels[0].length}`);
      this.canAcceptNewImage = true;
    }, 1000);
  }

  setColumn(column) {
    for (let pixel = 0; pixel < NUM_LEDS; pixel++) {
      const { r, g, b } = int2rgb(column[pixel]);
      this.client.setPixel(pixel, r, g, b);
    }
    this.client.writePixels();
  }

  start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    console.log('start');
    global.setTimeout(() => {
      this.startAnimation();
    }, 1000)
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
    setTimeout(() => {
      // ws281x.render(allBlack);
      this.setColumn(allBlack);
      this.isRunning = false;
    }, 50);
  }

  startAnimation() {
    global.clearTimeout(this.renderTimeout);
    if (this.pixels.length < 2) {
      this.stopAnimation();
      return;
    }
    this.renderTimeout = global.setTimeout(() => {

      // process.stdout.write(`offset:${this.offset}  width:${this.pixels.length}  fps:${this.fps}\r`);
      console.log(`offset:${chalk.cyanBright(this.offset)}  width:${chalk.yellowBright(this.pixels.length)}  fps:${chalk.green(this.fps)}`);

      const column = this.pixels[this.offset];

      if (!column || !column.length) {
        return;
      }

      // const textRow = column.map((color, index) => {
      //   if (index > 7) {
      //     return '';
      //   }
      //   if (color === 0) {
      //     return ' ';
      //   }
      //   return chalk.hex(`#${`00000${color.toString(16)}`.slice(-6)}`)('▓▓') // ░▒▓█
      // });
      // console.log(textRow.join(''));

      // ws281x.render(new Uint32Array(column));

      this.setColumn(column);

      this.offset = (this.offset + 1) % this.pixels.length;

      if (this.offset !== 0) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }

    }, 1000 / this.fps);
  }
}

let writer;
const getWriter = () => {
  return writer || new Writer();
};

module.exports = getWriter();
