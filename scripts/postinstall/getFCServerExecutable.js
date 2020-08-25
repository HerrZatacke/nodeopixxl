const { sep } = require('path');

const getFCServerExecutable = () => {
  if (process.arch === 'arm') {
    return 'fcserver-rpi';
  }

  if (sep === '\\') {
    return 'fcserver.exe';
  }

  throw new Error('OS/Arch not supported. (yet?)');
};

module.exports = getFCServerExecutable;
