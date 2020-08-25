const path = require('path');
const { spawn } = require('child_process');
const getFCServerExecutable = require('../tools/getFCServerExecutable')();
const getOs = require('../tools/getOs');


class SecondaryServers {
  constructor({ devMode }) {
    this.fcExecutable = path.join(process.cwd(), 'fcserver', getFCServerExecutable);
    this.wsNpmScript = devMode ? 'wsserver:dev' : 'wsserver:prod';

    this.npmCommand = getOs() === 'pi' ? 'npm' : 'npm.cmd';

    this.spawnOpts = {
      cwd: process.cwd(),
    };

    this.fcProcess = this.startFCServer();
    this.wsProcess = this.startWSServer();

  }

  startFCServer() {
    // eslint-disable-next-line no-console
    console.info(`starting fcserver (${this.fcExecutable})`);
    const fcproc = spawn(this.fcExecutable, [], this.spawnOpts);
    fcproc.stdout.pipe(process.stdout);
    // fcproc.stderr.pipe(process.stderr); // Waiting for Windows to install Fadecandy driver. This may take a moment...
    return fcproc;
  }

  startWSServer() {
    // eslint-disable-next-line no-console
    console.info(`starting wsserver (${this.wsNpmScript})`);
    const wsproc = spawn(this.npmCommand, ['run', this.wsNpmScript], this.spawnOpts);
    wsproc.stdout.pipe(process.stdout);
    wsproc.stderr.pipe(process.stderr);
    return wsproc;
  }

  handleRequest(req, res) {

    if (this.fcProcess.exitCode !== null) {
      this.fcProcess = this.startFCServer();
    }

    if (this.wsProcess.exitCode !== null) {
      this.wsProcess = this.startWSServer();
    }

    res.json({
      fcProcess: this.fcProcess.exitCode === null,
      wsProcess: this.wsProcess.exitCode === null,
    });
  }

  get middleware() {
    return this.handleRequest.bind(this);
  }

}

module.exports = SecondaryServers;
