const writer = require('../../writer');

const mwControl = (req, res) => {

  switch (req.params.action) {
    case 'start':
      writer.start();
      break;
    case 'stop':
      writer.stop();
      break;
    case 'fps':
      writer.setFPS(req.params.value || 30);
      break;
    default:
      break;
  }

  res.json(req.params);
};

module.exports = mwControl;
