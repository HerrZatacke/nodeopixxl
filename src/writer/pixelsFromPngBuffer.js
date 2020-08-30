const { PNG } = require('pngjs');

const pixelsFromPngBuffer = (buffer) => {
  const png = PNG.sync.read(buffer);
  return Uint8Array.from(png.data)
    // removes the alpha channel
    .filter((val, index) => (
      (index + 1) % 4 !== 0
    ));
};

module.exports = pixelsFromPngBuffer;
