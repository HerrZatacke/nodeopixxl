const path = require('path');
const writer = require('../../writer');

const mwSetImage = (req, res) => {
  if (!writer.isRunning) {
    const imageData = new Uint8ClampedArray(JSON.parse(req.body.image));
    writer.setImageFile(imageData);
    res.json({
      length: imageData.length
    });
  } else {
    res.json({
      already: 'running',
    });
  }
};

module.exports = mwSetImage;
