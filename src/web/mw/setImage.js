const path = require('path');
const writer = require('../../writer');

const mwSetImage = (req, res) => {
  const imageData = new Uint8ClampedArray(JSON.parse(req.body.image));
  writer.setImageFile(imageData);
  res.json({
    length: imageData.length
  });
};

module.exports = mwSetImage;
