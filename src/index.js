const ws281x = require('rpi-ws281x-native');
const getImage = require('./getImage');


const NUM_LEDS = 8;
const pixelData = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', () => {
  ws281x.reset();
  process.nextTick(() => { process.exit(0); });
});


const FPS = 30;
const pixels = getImage('assets/x8lems.png');

// ---- animation-loop
let offset = 0;
setInterval(() => {
  for (let i = 0; i < NUM_LEDS; i++) {

    // for 'simplerainbow'
    // pixelData[i] = pixels[(i + offset) % pixels.length];

    // por 'marios'
    pixelData[i] = pixels[offset][i];
  }

  offset = (offset + 1) % pixels.length;
  ws281x.render(pixelData);
}, 1000 / FPS);

console.log('Press <ctrl>+C to exit.');

