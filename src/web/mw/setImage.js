const path = require('path');
const writer = require('../../writer');

const mwSetImage = (req, res) => {
  const imagePath = path.join(process.cwd(), req.file.path);
  writer.setImageFile(imagePath);
  res.json({
    imagePath,
  });
};

module.exports = mwSetImage;
