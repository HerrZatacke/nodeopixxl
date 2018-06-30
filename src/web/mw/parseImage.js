const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');

const mwParseImage = (req, res, next) => {

  const imagePath = path.join(process.cwd(), req.file.path);

  Jimp.read(imagePath)
    .then((image) => {
      console.log(new Uint8ClampedArray(image.bitmap.data));
      res.json({
        width: image.bitmap.width,
        height: image.bitmap.height,
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
