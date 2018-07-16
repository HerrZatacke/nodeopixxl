const bodyParser = require('body-parser');

const rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = Uint8Array.from(buf.toString(encoding || 'utf8').split('').map(x => (x.charCodeAt(0))))
  }
};

module.exports = bodyParser.raw({ limit: '5mb', verify: rawBodySaver, type: () => true });
