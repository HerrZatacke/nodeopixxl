const path = require('path');
const express = require('express');
const chalk = require('chalk');
const url = require('url');
const setupServer = require('./setupServer');
const writerSocket = require('../src/writer');

const port = 3000;
const app = express();

setupServer(false)(app);

app.use(express.static(path.join(process.cwd(), 'dist')));

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(chalk.green(`listening at http://localhost:${port}`));
});


server.on('upgrade', (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/writer') {
    writerSocket.handleUpgrade(request, socket, head, (ws) => {
      writerSocket.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});
