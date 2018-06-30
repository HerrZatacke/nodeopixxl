const path = require('path');
const express = require('express');
const multer = require('multer');
const pngparse = require('pngparse');

const upload = multer({ dest: 'uploads/' });

const server = express();

server.get('/', express.static(path.join(process.cwd(), 'src', 'web', 'assets')));

server.post('/newfile', upload.single('image'), (req, res) => {
  pngparse.parseFile(path.join(process.cwd(), req.file.path), function(er, imageData) {
    if (er) {
      throw er;
    }

    console.log(new Uint8ClampedArray(imageData.data));

    res.send('thanks for the file');
  });

});

server.listen(3000, () => {
  console.log('Example server listening on port 3000!');
});
