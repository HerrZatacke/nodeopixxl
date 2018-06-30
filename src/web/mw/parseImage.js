const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');

const getPixels = require('../../writer/getPixels');

const mwParseImage = (req, res, next) => {

  const imagePath = path.join(process.cwd(), req.file.path);

  Jimp.read(imagePath)
    .then((image) => {

      const pixels = getPixels(image.bitmap);

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
