const path = require('path');
const writer = require('../../writer');

const mwSetImage = (req, res) => {
  if (!writer.isRunning && req.rawBody) {
    writer.setImageFile(req.rawBody);
    res.json({
      size: req.rawBody.length,
    });
  } else {
    res.json({
      running: writer.isRunning,
      rawBody: !!req.rawBody,
    });
  }
};

module.exports = mwSetImage;
