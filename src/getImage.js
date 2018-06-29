const fs = require('fs');
const path = require('path');
const PngImg = require('png-img');
const rgb2int = require('./rgb2int');

const getImage = (brightness, filename) => {
  const buf = fs.readFileSync(path.join(process.cwd(), filename));
  const img = new PngImg(buf);
  const { width, height } = img.size();

  const pixels = [];

  for (let x = 0; x < width; x++) {
    const col = [];
    pixels.push(col);
    for (let y = 0; y < height; y++) {

      let { r, g, b } = img.get(x, y);

      r = parseInt(r * brightness, 10);
      g = parseInt(g * brightness, 10);
      b = parseInt(b * brightness, 10);

      col.push(rgb2int(r, g, b));
    }
  }
  return pixels;
};

module.exports = getImage;
