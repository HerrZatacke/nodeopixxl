const getOs = require('./getOs');

const getFCServerExecutable = () => {
  switch (getOs()) {
    case 'pi':
      return 'fcserver-rpi';
    case 'win':
      return 'fcserver.exe';
    default:
      return null;
  }
};

module.exports = getFCServerExecutable;
