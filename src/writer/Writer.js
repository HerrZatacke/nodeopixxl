const { EventEmitter } = require('events');
const chalk = require('chalk');
const OPC = require('./opc');
const ScreenDisplayClient = require('./ScreenDisplayClient');
const randomImage = require('./randomImage');
const int2rgb = require('./int2rgb');
const getPixels = require('./getPixels');

const allBlack = new Uint32Array(CONFIG.NUM_LEDS);

class Writer extends EventEmitter {

  constructor() {
    super();
    this.renderTimeout = null;
    this.loadTimeout = null;
    this.fps = 60;
    this.pixels = [[]];
    this.offset = 0;
    this.canAcceptNewImage = true;
    this.isRunning = false;
    this.loop = false;
    this.hasConnection = false;
  }

  getStatus() {
    return {
      fps: this.fps,
      offset: this.offset,
      canAcceptNewImage: this.canAcceptNewImage,
      isRunning: this.isRunning,
      loop: this.loop,
      hasConnection: this.hasConnection,
    };
  }

  init() {
    // trap the SIGINT and reset before exit
    process.on('SIGINT', () => {
      this.setColumn(allBlack);
      process.nextTick(() => {
        process.exit(0);
      });
    });

    if (process.argv.indexOf('localclient') !== -1) {
      this.client = new ScreenDisplayClient(conn => this.setConnectionStatus(conn));
    } else {
      this.client = new OPC('localhost', 7890, conn => this.setConnectionStatus(conn));
    }

    this.setColumn(allBlack);
    this.emit('status', this.getStatus());
    this.setImageFile(randomImage());
  }

  setImageFile(imageData) {
    if (this.isRunning) {
      return;
    }

    if (!this.canAcceptNewImage) {
      return;
    }
    this.canAcceptNewImage = false;
    this.pixels = [[]];
    this.emit('status', {
      canAcceptNewImage: this.canAcceptNewImage,
      image: new Uint8ClampedArray(3),
    });

    console.info(chalk.blue(`loading image with ${imageData.length / 3} single pixels`));

    // read a file after a second
    global.clearTimeout(this.loadTimeout);
    this.loadTimeout = global.setTimeout(() => {
      this.pixels = getPixels(imageData);
      console.info(chalk.blue(`image loaded (${this.pixels.length}x${this.pixels[0].length})`));
      this.canAcceptNewImage = true;
      this.emit('status', {
        canAcceptNewImage: this.canAcceptNewImage,
        image: [...imageData],
      });
    }, 100);
  }

  setColumn(column) {
    for (let pixel = 0; pixel < CONFIG.NUM_LEDS; pixel += 1) {
      const { r, g, b } = int2rgb(column[pixel]);
      this.client.setPixel(pixel, r, g, b);
    }
    this.client.writePixels();
  }

  start(timeout = 0) {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.emit('status', {
      isRunning: this.isRunning,
    });
    if (timeout) {
      this.setColumn(allBlack);
    }
    this.renderTimeout = global.setTimeout(() => {
      this.startAnimation();
    }, timeout);
  }

  stop() {
    this.stopAnimation();
  }

  setLoop(value) {
    this.loop = !!value;
    this.emit('status', {
      loop: this.loop,
    });
  }

  setFPS(fps = 30) {
    this.fps = parseInt(fps, 10) || 30;
    this.emit('status', {
      fps: this.fps,
    });
  }

  setConnectionStatus(hasConnection) {
    this.hasConnection = hasConnection;
    this.emit('status', {
      hasConnection: this.hasConnection,
    });
  }

  stopAnimation() {
    global.clearTimeout(this.renderTimeout);
    this.renderTimeout = null;
    this.offset = 0;
    this.setColumn(allBlack);
    this.isRunning = false;
    this.emit('status', {
      isRunning: this.isRunning,
      offset: this.offset,
    });
  }

  startAnimation() {
    global.clearTimeout(this.renderTimeout);
    if (this.pixels.length < 2) {
      this.stopAnimation();
      return;
    }

    const delay = Math.floor(1000 / this.fps);

    console.info(`offset:${chalk.cyanBright(this.offset)}  width:${chalk.yellowBright(this.pixels.length)}  fps:${chalk.green(this.fps)}  delay:${chalk.red(delay)}`);
    const column = this.pixels[this.offset];

    if (!column || !column.length) {
      this.stopAnimation();
      return;
    }

    this.setColumn(column);

    this.offset = (this.offset + 1) % this.pixels.length;

    if (delay > 10 || this.offset % 2 === 0) {
      this.emit('status', {
        offset: this.offset,
      });
    }

    this.renderTimeout = global.setTimeout(() => {
      if (this.offset !== 0 || this.loop) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    }, delay);
  }
}

let writer;
const getWriter = () => (
  writer || new Writer()
);

module.exports = getWriter();
