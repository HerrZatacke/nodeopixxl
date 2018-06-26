const rgb2int = require('./rgb2int');

const ON = 32;
const OFF = 0;

const BLK = rgb2int(OFF, OFF, OFF);
const RED = rgb2int( ON, OFF, OFF);
const GRN = rgb2int(OFF,  ON, OFF);
const BLU = rgb2int(OFF, OFF,  ON);
const YEL = rgb2int( ON,  ON, OFF);
const CYA = rgb2int(OFF,  ON,  ON);
const MGN = rgb2int( ON, OFF,  ON);
const WHT = rgb2int( ON,  ON,  ON);

module.exports = { BLK, RED, GRN, BLU, YEL, CYA, MGN, WHT };