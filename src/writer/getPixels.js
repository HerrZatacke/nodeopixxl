const ndarray = require('ndarray');
const rgb2int = require('./rgb2int');

const getPixels = (imageData, brightness = 1) => {

  const pixels = [];

  const height = CONFIG.NUM_LEDS;
  const width = imageData.length / (height * 3); // NUM_LEDS * 3

  const pixelData = ndarray(imageData, [height, width, 3]);

  for (let x = 0; x < width; x += 1) {
    const col = [];
    pixels.push(col);
    for (let y = 0; y < height; y += 1) {

      let r = pixelData.get(y, x, 0);
      let g = pixelData.get(y, x, 1);
      let b = pixelData.get(y, x, 2);

      r = parseInt(r * brightness, 10);
      g = parseInt(g * brightness, 10);
      b = parseInt(b * brightness, 10);

      col.unshift(rgb2int(r, g, b));
    }
  }

  return pixels;
};

module.exports = getPixels;
