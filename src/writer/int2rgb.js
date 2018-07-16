module.exports = val => ({
  r: val >> 16 & 0xff,
  g: val >> 8 & 0xff,
  b: val & 0xff,
});
