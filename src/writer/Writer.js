const chalk = require('chalk');
const OPC = require('./opc');
const pixelsFromPngBuffer = require('./pixelsFromPngBuffer');
const randomImage = require('./randomImage');
const int2rgb = require('./int2rgb');
const getPixels = require('./getPixels');
const getImage = require('./getImage');
const getOs = require('../../scripts/tools/getOs');

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
      fps: 200,
      offset: 0,
      canAcceptNewImage: true,
      isRunning: false,
      loop: false,
      hasConnection: false,
      startDelay: 0,
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
    this.setImageFile(getImage());

    global.setTimeout(() => {
      this.start();
    }, 2500);


    if (getOs() === 'pi') {
      this.initGPIO();
    }
  }

  initGPIO() {
    // eslint-disable-next-line global-require,import/no-unresolved
    const rpio = require('rpio');

    // pin 13 (GPIO-27) is opposite to a ground pin.

    const now = () => (
      (new Date()).getTime()
    );

    const pin = 13;
    let lastPinUpdate = now();

    rpio.open(pin, rpio.INPUT, rpio.PULL_UP);

    rpio.poll(pin, () => {
      if (lastPinUpdate + 50 < now()) {
        return;
      }

      // eslint-disable-next-line no-console
      console.log(`pin ${pin} is ${rpio.read(pin) ? 'high' : 'low'}`);
      lastPinUpdate = now();
    }, rpio.POLL_BOTH);
  }

  bindSocketEvents() {
    this.socket.on('connection', (ws) => {

      ws.on('message', (received) => {

        if (received instanceof Buffer) {
          this.setImageFile(pixelsFromPngBuffer(received));
        } else {
          const message = JSON.parse(received);

          Object.keys(message).forEach((action) => {
            const payload = message[action];
            switch (action) {
              case 'start':
                this.start();
                break;
              case 'stop':
                this.stop();
                break;
              case 'setrandom':
                this.setImageFile(randomImage(500, this.numLeds));
                break;
              case 'loop':
                this.setLoop(payload);
                break;
              case 'startdelay':
                this.setStartDelay(payload);
                break;
              case 'fps':
                this.setFPS(payload);
                break;
              default:
                break;
            }
          });
        }
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

  start() {
    if (this.status.isRunning || !this.status.hasConnection) {
      return;
    }

    this.updateStatus({
      isRunning: true,
    });
    if (this.status.startDelay) {
      this.setColumn(this.allBlack);
    }

    this.renderTimeout = global.setTimeout(() => {
      this.startAnimation();
    }, this.status.startDelay);
  }

  stop() {
    this.stopAnimation();
  }

  setLoop(value) {
    this.updateStatus({
      loop: !!value,
    });
  }

  setStartDelay(value) {
    this.updateStatus({
      startDelay: parseInt(value, 10) || 0,
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
    console.info(`offset:${chalk.cyanBright(this.status.offset)}  width:${chalk.yellowBright(this.pixels.length)}  fps:${chalk.green(this.status.fps)}  delay:${chalk.red(delay)}ms`);

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


    const atLastCol = this.status.offset === 0;
    const additionalLoopDelay = (atLastCol && this.status.loop) ? this.status.startDelay : 0;

    if (additionalLoopDelay) {
      // eslint-disable-next-line no-console
      console.info(`delaying for an extra ${chalk.red(additionalLoopDelay)}ms`);
    }

    this.renderTimeout = global.setTimeout(() => {
      if (!atLastCol || this.status.loop) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    }, delay + additionalLoopDelay);
  }
}

module.exports = Writer;
