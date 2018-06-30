const path = require('path');
const express = require('express');

const mwStatic = express.static(path.join(process.cwd(), 'src', 'web', 'assets'));

module.exports = mwStatic;
