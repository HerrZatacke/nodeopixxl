const writer = require('../../writer');

const mwControl = (req, res) => {

  switch (req.params.action) {
    case 'start':
      writer.start();
      break;
    case 'stop':
      writer.stop();
      break;
    default:
      break;
  }

  res.json(req.params);
};

module.exports = mwControl;
