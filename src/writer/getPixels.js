const fs = require('fs');
const path = require('path');
const ndarray = require('ndarray');
const rgb2int = require('./rgb2int');

const getPixels = (imageData, brightness = 1) => {

  const pixels = [];

  const height = 160;
  const width = imageData.length / 480; // NUM_LEDS * 3

  const pixelData = ndarray(imageData, [height, width, 3]);

  for (let x = 0; x < width; x++) {
    const col = [];
    pixels.push(col);
    for (let y = 0; y < height; y++) {

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
