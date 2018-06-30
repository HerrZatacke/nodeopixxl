const ipc = require('node-ipc');
const getImage = require('./getPixels');
const ipcConfig = require('./ipcConfig');

Object.assign(ipc.config, ipcConfig);

const BRIGHTNESS = 1;
const pixels = getImage(BRIGHTNESS, 'assets/woggle.png');

ipc.connectToNet('nodeopixxl', () => {
  const npx = ipc.of.nodeopixxl;

  if (!npx) {
    process.exit(1);
  }

  npx.on('connect', () => {
    console.log('## connected ##');
    npx.emit('nodeopixxl-imagedata', pixels);

    global.setTimeout(() => {
      npx.emit('nodeopixxl-start');
    }, 2000);

    global.setTimeout(() => {
      npx.emit('nodeopixxl-fps', 10);
    }, 4000);

    global.setTimeout(() => {
      npx.emit('nodeopixxl-fps', 100);
    }, 9000);

    global.setTimeout(() => {
      npx.emit('nodeopixxl-stop');
    }, 16000);

  });

  npx.on('disconnect', () => {
    console.log('i miss da serverz');
  });

  npx.on('nodeopixxl-wrap', () => {
    console.log('wrap!');
  });

  // too much?
  // npx.on('nodeopixxl-index', data => {
  //   console.log(`@${data}`);
  // });

});
