const fs = require('fs');
const path = require('path');
const pixelsFromPngBuffer = require('./pixelsFromPngBuffer');

const getImage = () => (
  pixelsFromPngBuffer(fs.readFileSync(path.join(process.cwd(), 'src', 'web', 'assets', 'welcome.png')))
);

module.exports = getImage;
