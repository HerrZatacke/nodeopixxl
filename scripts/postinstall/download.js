const fs = require('fs');
const path = require('path');
const https = require('https');
const unzip = require('unzip-stream');
const mkdirp = require('mkdirp');
const fcServerExecutable = require('../tools/getFCServerExecutable')();
const getOs = require('../tools/getOs');

const executablePath = `fadecandy-package-02/bin/${fcServerExecutable}`;

const download = (url, dest) => (
  new Promise((resolve, reject) => {
    mkdirp(dest)
      .then(() => {
        https.get(url, (response) => {
          response
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
              const filePath = entry.path;
              if (filePath === executablePath) {
                entry.pipe(fs.createWriteStream(path.join(dest, path.basename(filePath))));
              } else {
                entry.autodrain();
              }
            })
            .on('finish', () => {

              if (getOs() === 'pi') {
                try {
                  fs.chmodSync(executablePath, 0o775);
                } catch (error) {
                  reject(error);
                }
              }

              resolve(path.join(dest, fcServerExecutable));
            });
        });
      });
  })
);

module.exports = download;
