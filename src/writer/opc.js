/*
 * Simple Open Pixel Control client for Node.js
 *
 * 2013 Micah Elizabeth Scott
 * This file is released into the public domain.
 */

const net = require('net');

class OPC {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.pixelBuffer = null;
    this.connect();
  }

  connect() {
    this.socket = new net.Socket();
    this.connected = false;

    this.socket.on('close', () => {
      console.info('Connection closed');
      this.socket = null;
      this.connected = false;
    });

    this.socket.on('error', () => {
      console.info('Connection error');
      this.socket = null;
      this.connected = false;
    });

    this.socket.connect(this.port, this.host, () => {
      console.info(`Connected to ${this.socket.remoteAddress}`);
      this.connected = true;
      this.socket.setNoDelay();
    });
  }

  writePixels() {
    if (!this.socket) {
      this.connect();
    }
    if (!this.connected) {
      return;
    }
    this.socket.write(this.pixelBuffer);
  }

  setPixelCount(num) {
    const length = 4 + (num * 3);
    if (!this.pixelBuffer || this.pixelBuffer.length !== length) {
      this.pixelBuffer = Buffer.alloc(length);
    }

    // Initialize OPC header
    this.pixelBuffer.writeUInt8(0, 0); // Channel
    this.pixelBuffer.writeUInt8(0, 1); // Command
    this.pixelBuffer.writeUInt16BE(num * 3, 2); // Length
  }

  setPixel(num, r, g, b) {
    const offset = 4 + (num * 3);
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


module.exports = OPC;
