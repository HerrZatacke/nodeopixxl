const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

class ScreenDisplayClient {
  constructor(statusCallback = () => {}) {
    this.pixelBuffer = null;
    this.page = null;
    this.statusCallback = statusCallback;
    this.init();
  }

  init() {
    this.statusCallback(false);
    puppeteer.launch({
      headless: false,
      // devtools: true,
      defaultViewport: null,
      args: [
        '--start-fullscreen',
        '--disable-infobars',
      ],
    })
      .then(browser => (
        browser.pages()
      ))
      .then((pages) => {
        [this.page] = pages;
        return this.page.goto('about:blank');
      })
      .then(() => {
        const pageTemplate = fs.readFileSync(path.join(process.cwd(), 'src', 'writer', 'pageTemplate.js'), { encoding: 'utf8' });
        return this.page.evaluate(pageTemplate);
      })
      .then(() => (
        this.page.evaluate(`initBody(${CONFIG.NUM_LEDS})`)
      ))
      .then(() => {
        this.statusCallback(true);
      });
  }

  writePixels() {
    if (!this.page || !this.page.evaluate) {
      this.statusCallback(false);
      return;
    }
    // console.log(this.pixelBuffer.length);
    const a = [...this.pixelBuffer].join(',');
    this.page.evaluate(`render(${a})`)
      .catch(() => {
        this.statusCallback(false);
      });
  }

  setPixelCount(num) {
    const length = num * 3;
    if (!this.pixelBuffer || this.pixelBuffer.length !== length) {
      this.pixelBuffer = Buffer.alloc(length);
    }
  }

  setPixel(num, r, g, b) {
    const offset = num * 3;
    if (!this.pixelBuffer || offset + 3 > this.pixelBuffer.length) {
      this.setPixelCount(num + 1);
    }

    // eslint-disable-next-line no-bitwise
    this.pixelBuffer.writeUInt8(Math.max(0, Math.min(255, r | 0)), offset);
    // eslint-disable-next-line no-bitwise
    this.pixelBuffer.writeUInt8(Math.max(0, Math.min(255, g | 0)), offset + 1);
    // eslint-disable-next-line no-bitwise
    this.pixelBuffer.writeUInt8(Math.max(0, Math.min(255, b | 0)), offset + 2);
  }

}

module.exports = ScreenDisplayClient;
