const fs = require('fs');
const ws281x = require('rpi-ws281x-native');
const chalk = require('chalk');
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
    this.canStart = true;
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

  setImageFile(imageData) {
    if (!this.canStart) {
      console.log('running');
      return;
    }

    this.stopAnimation();

    if (!this.canAcceptNewImage) {
      console.log('busy loading');
      return;
    }

    console.log(`loading image with ${imageData.length / 3} single pixels`);
    this.canAcceptNewImage = false;

    // read a file after a second
    global.clearTimeout(this.loadTimeout);
    this.loadTimeout = global.setTimeout(() => {
      this.pixels = getPixels(imageData);
      console.log(`received pixels ${this.pixels.length}x${this.pixels[0].length}`);
      this.canAcceptNewImage = true;
    }, 1000);
  }

  start() {
    if (!this.canStart) {
      return;
    }
    this.canStart = false;
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
    this.canStart = true;
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
      console.log(`offset:${chalk.cyanBright(this.offset)}  width:${chalk.yellowBright(this.pixels.length)}  fps:${chalk.green(this.fps)}`);

      // clone array -> does this help against the crashes?
      const column = [...this.pixels[this.offset]];

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

      ws281x.render(new Uint32Array(column));

      this.offset = (this.offset + 1) % this.pixels.length;

      if (this.offset !== 0) {
        this.startAnimation();
      } else {
        this.stopAnimation();
        this.canStart = false;
        global.setTimeout(() => {
          this.canStart = true;
        }, 500);
      }

    }, 1000 / this.fps);
  }
}

let writer;
const getWriter = () => {
  return writer || new Writer();
};

module.exports = getWriter();
