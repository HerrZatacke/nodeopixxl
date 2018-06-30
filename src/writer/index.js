const ipc = require('node-ipc');
const ipcConfig = require('./ipcConfig');

Object.assign(ipc.config, ipcConfig);

class Writer {
  constructor() {
    this.socket = null;
  }

  init() {
    ipc.connectToNet('nodeopixxl', () => {
      this.socket = ipc.of.nodeopixxl;
      this.addIPCBindings();
    });
  }

  addIPCBindings() {
    this.socket.on('connect', () => {
      console.log('## connected ##');
      this.socket.emit('nodeopixxl-imagedata', [[]]);
    });

    this.socket.on('disconnect', () => {
      console.log('i miss da serverz');
    });

    this.socket.on('nodeopixxl-wrap', () => {
      console.log('wrap!');
    });
    // too much?
    // this.socket.on('nodeopixxl-index', data => {
    //   console.log(`@${data}`);
    // });
  }

  setImageFile(imagepath) {
    this.socket.emit('nodeopixxl-imagefile', imagepath);
  }

  start() {
    this.socket.emit('nodeopixxl-start');
  }

  stop() {
    this.socket.emit('nodeopixxl-stop');
  }

  setFPS(fps = 30) {
    this.socket.emit('nodeopixxl-fps', fps);
  }
}

let writer;
const getWriter = () => {
  return writer || new Writer();
};

module.exports = getWriter();
