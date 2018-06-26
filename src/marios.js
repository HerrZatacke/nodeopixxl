const fs = require('fs');
const path = require('path');
const PngImg = require('png-img');
const rgb2int = require('../src/rgb2int');

const buf = fs.readFileSync(path.join(process.cwd(), 'assets/mario.png'));
const img = new PngImg(buf);
const { width, height } = img.size();

const BRIGHTNESS = 0.2;
const pixels = [];

for (var x = 0; x < width; x++) {
  const col = [];
  pixels.push(col);
  for (var y = 0; y < height; y++) {
    
    let { r, g, b } = img.get(x, y);

    r = parseInt(r * BRIGHTNESS, 10);
    g = parseInt(g * BRIGHTNESS, 10);
    b = parseInt(b * BRIGHTNESS, 10);

    col.push(rgb2int(r, g, b));
  }
}

module.exports = pixels;
