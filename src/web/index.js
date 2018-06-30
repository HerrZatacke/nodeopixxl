const express = require('express');

const multer = require('multer');
const mwParseImage = require('./mw/parseImage');
const mwStatus = require('./mw/status');
const mwStatic = require('./mw/static');
const mwError = require('./mw/error');

const server = express();

server.post('/newfile', multer({ dest: '.tmp/' }).single('image'));
server.post('/newfile', mwParseImage);
server.get('/status', mwStatus);
server.get('/', mwStatic);
server.use(mwError);

server.listen(3000, () => {
  console.log('Example server listening on port 3000!');
});
