/* eslint-disable no-bitwise */
module.exports = (r, g, b) => (
  ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff)
);
