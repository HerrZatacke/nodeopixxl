const express = require('express');
const writer = require('../writer');
const multer = require('multer');

const mwSetImage = require('./mw/setImage');
const mwStatus = require('./mw/status');
const mwStatic = require('./mw/static');
const mwControl = require('./mw/control');
const mwError = require('./mw/error');

const server = express();
writer.init();

server.post('/newfile', multer().none());
server.post('/newfile', mwSetImage);
server.get('/status', mwStatus);
server.get(['/control/:action', '/control/:action/:value'], mwControl);
server.get(['/', '/*'], mwStatic);
server.use(mwError);

server.listen(3000, () => {
  console.log('Example server listening on port 3000!');
});
