const fs = require('fs');
const path = require('path');
const ndarray = require('ndarray');
const rgb2int = require('./rgb2int');

const getPixels = (bitmap, brightness = 1) => {

  const pixels = [];
  const { width, height } = bitmap;
  const pixelData = ndarray(bitmap.data, [width, height, 4]);

  for (let x = 0; x < width; x++) {
    const col = [];
    pixels.push(col);
    for (let y = 0; y < height; y++) {

      let r = pixelData.get(x, y, 0);
      let g = pixelData.get(x, y, 1);
      let b = pixelData.get(x, y, 2);

      r = parseInt(r * brightness, 10);
      g = parseInt(g * brightness, 10);
      b = parseInt(b * brightness, 10);

      col.push(rgb2int(r, g, b));
    }
  }
  return pixels;
};

module.exports = getPixels;
