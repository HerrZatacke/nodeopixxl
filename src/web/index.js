const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');

const upload = multer({ dest: 'uploads/' });

const server = express();


server.post('/newfile', upload.single('image'), (req, res, next) => {

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


});


server.get('/status', (req, res) => {
  res.json({a:23});
});

server.get('/', express.static(path.join(process.cwd(), 'src', 'web', 'assets')));

// see: https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling
// eslint-disable-next-line no-unused-vars
server.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500);
  res.send(error.stack);
});


server.listen(3000, () => {
  console.log('Example server listening on port 3000!');
});
