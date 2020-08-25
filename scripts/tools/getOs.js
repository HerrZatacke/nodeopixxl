const { sep } = require('path');

const getOs = () => {
  if (process.arch === 'arm') {
    return 'pi';
  }

  if (sep === '\\') {
    return 'win';
  }

  throw new Error('OS/Arch not supported. (yet?)');
};

module.exports = getOs;
