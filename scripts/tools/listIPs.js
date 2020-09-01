/* eslint-disable no-console */
const { networkInterfaces } = require('os');
const chalk = require('chalk');

const listIPs = () => {

  const nets = networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address);
      }
    }
  }

  console.info('');
  console.info(chalk.green('--------------------'));
  results.forEach((ip) => {
    console.info(chalk.green(ip));
  });
  console.info(chalk.green('--------------------'));
  console.info('');
};

module.exports = listIPs;
