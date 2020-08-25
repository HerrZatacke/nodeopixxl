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
    let savedExecutable = null;
    mkdirp(dest)
      .then(() => {
        https.get(url, (response) => {
          response
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
              const filePath = entry.path;
              if (filePath === executablePath) {
                savedExecutable = path.join(dest, path.basename(filePath));
                entry.pipe(fs.createWriteStream(savedExecutable));
              } else {
                entry.autodrain();
              }
            })
            .on('finish', () => {

              if (getOs() === 'pi') {
                try {
                  fs.chmodSync(savedExecutable, 0o775);
                } catch (error) {
                  reject(error);
                }
              }

              resolve(savedExecutable);
            });
        });
      });
  })
);

module.exports = download;
