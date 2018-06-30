const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');

const writer = require('../../writer');

const mwParseImage = (req, res, next) => {

  const imagePath = path.join(process.cwd(), req.file.path);

  Jimp.read(imagePath)
    .then((image) => {

      writer.setPixels(image.bitmap);

      res.json({
        width: image.bitmap.width,
        height: image.bitmap.height,
        // pixels,
      });
    })
    .catch((err) => {
      console.log(err.message);
      next(err);
    })
    .then((image) => {
      fs.unlinkSync(imagePath);
    });
};

module.exports = mwParseImage;
