const fs = require('fs');
const path = require('path');
const ndarray = require('ndarray');
const rgb2int = require('./rgb2int');

const getPixels = (bitmap, brightness = 1) => {

  const pixels = [];
  const { width, height } = bitmap;
  const pixelData = ndarray(bitmap.data, [height, width, 4]);

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
