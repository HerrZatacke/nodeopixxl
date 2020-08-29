const chalk = require('chalk');
const OPC = require('./opc');
const randomImage = require('./randomImage');
const int2rgb = require('./int2rgb');
const getPixels = require('./getPixels');


class Writer {

  constructor({ socket, numLeds }) {
    if (!socket) {
      throw new Error('Socket missing');
    }

    if (!numLeds) {
      throw new Error('number of LEDs not defined');
    }

    this.socket = socket;
    this.numLeds = numLeds;
    this.renderTimeout = null;
    this.loadTimeout = null;
    this.pixels = [[]];

    this.allBlack = new Uint32Array(this.numLeds);

    this.status = {
      fps: 60,
      offset: 0,
      canAcceptNewImage: true,
      isRunning: false,
      loop: false,
      hasConnection: false,
    };
  }

  init() {
    // trap the SIGINT and reset before exit
    process.on('SIGINT', () => {
      this.setColumn(this.allBlack);
      process.nextTick(() => {
        process.exit(0);
      });
    });

    this.client = new OPC('localhost', 7890, (conn) => this.setConnectionStatus(conn));

    this.setColumn(this.allBlack);
    this.bindSocketEvents();
    this.sendStatus(this.status);
    this.setImageFile(randomImage(this.numLeds, this.numLeds));
  }

  bindSocketEvents() {
    this.socket.on('connection', (ws) => {

      ws.on('message', (messageString) => {
        const message = JSON.parse(messageString);

        Object.keys(message).forEach((action) => {
          const payload = message[action];
          switch (action) {
            case 'setImage':
              this.setImageFile(Uint8Array.from(payload));
              break;
            case 'start':
            case 'start_delayed':
              this.start(payload || 0);
              break;
            case 'stop':
              this.stop();
              break;
            case 'setrandom':
              this.setImageFile(randomImage(this.numLeds, this.numLeds));
              break;
            case 'loop':
              this.setLoop(payload);
              break;
            case 'fps':
              this.setFPS(payload);
              break;
            default:
              break;
          }
        });
      });

      ws.send(JSON.stringify(this.status));
    });
  }

  updateStatus(changes, dontSend = false) {
    Object.assign(this.status, changes);

    if (!dontSend) {
      this.sendStatus(changes);
    }
  }

  sendStatus(changes) {
    this.socket.clients.forEach((ws) => {
      ws.send(JSON.stringify(changes));
    });
  }

  setImageFile(imageData) {
    if (this.status.isRunning) {
      return;
    }

    if (!this.status.canAcceptNewImage) {
      return;
    }

    this.pixels = [[]];
    this.updateStatus({
      canAcceptNewImage: false,
      image: new Uint8ClampedArray(3),
    });

    // eslint-disable-next-line no-console
    console.info(chalk.blue(`loading image with ${imageData.length / 3} single pixels`));

    // read a file after a second
    global.clearTimeout(this.loadTimeout);
    this.loadTimeout = global.setTimeout(() => {
      this.pixels = getPixels(imageData, this.numLeds);

      // eslint-disable-next-line no-console
      console.info(chalk.blue(`image loaded (${this.pixels.length}x${this.pixels[0].length})`));

      this.updateStatus({
        canAcceptNewImage: true,
        image: [...imageData],
      });
    }, 100);
  }

  setColumn(column) {
    for (let pixel = 0; pixel < this.numLeds; pixel += 1) {
      const { r, g, b } = int2rgb(column[pixel]);
      this.client.setPixel(pixel, r, g, b);
    }

    this.client.writePixels();
  }

  start(timeout = 0) {
    if (this.status.isRunning || !this.status.hasConnection) {
      return;
    }

    this.updateStatus({
      isRunning: true,
    });
    if (timeout) {
      this.setColumn(this.allBlack);
    }

    this.renderTimeout = global.setTimeout(() => {
      this.startAnimation();
    }, timeout);
  }

  stop() {
    this.stopAnimation();
  }

  setLoop(value) {
    this.updateStatus({
      loop: !!value,
    });
  }

  setFPS(fps = 30) {
    this.updateStatus({
      fps: parseInt(fps, 10) || 30,
    });
  }

  setConnectionStatus(hasConnection) {
    if (this.status.hasConnection !== hasConnection) {
      this.updateStatus({
        hasConnection,
      });
      if (!hasConnection) {
        this.stop();
      }
    }
  }

  stopAnimation() {
    global.clearTimeout(this.renderTimeout);
    this.renderTimeout = null;
    this.setColumn(this.allBlack);
    this.updateStatus({
      isRunning: false,
      offset: 0,
    });
  }

  startAnimation() {
    global.clearTimeout(this.renderTimeout);
    if (this.pixels.length < 2) {
      this.stopAnimation();
      return;
    }

    const delay = Math.floor(1000 / this.status.fps);

    // eslint-disable-next-line no-console
    console.info(`offset:${chalk.cyanBright(this.status.offset)}  width:${chalk.yellowBright(this.pixels.length)}  fps:${chalk.green(this.status.fps)}  delay:${chalk.red(delay)}`);

    const column = this.pixels[this.status.offset];

    if (!column || !column.length) {
      this.stopAnimation();
      return;
    }

    this.setColumn(column);

    const offset = (this.status.offset + 1) % this.pixels.length;

    this.updateStatus({
      offset,
    }, (delay <= 10 && offset % 2 !== 0));

    this.renderTimeout = global.setTimeout(() => {
      if (this.status.offset !== 0 || this.status.loop) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    }, delay);
  }
}

module.exports = Writer;
