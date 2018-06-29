const ws281x = require('rpi-ws281x-native');
const getImage = require('./getImage');

const BRIGHTNESS = 1;
const FPS = 45;

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', () => {
  ws281x.reset();
  process.nextTick(() => { process.exit(0); });
});

const pixels = getImage(BRIGHTNESS, 'assets/woggle.png');

ws281x.init(pixels[0].length);

// ---- animation-loop
let offset = 0;
setInterval(() => {
  offset = (offset + 1) % pixels.length;
  ws281x.render(new Uint32Array(pixels[offset]));
}, 1000 / FPS);

console.log('Press ctrl+c to exit.');
