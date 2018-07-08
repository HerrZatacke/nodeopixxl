const writer = require('../../writer');

const mwStatus = (req, res) => {
  res.json({
    isRunning: writer.isRunning,
  });
};

module.exports = mwStatus;
