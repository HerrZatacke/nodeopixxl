const path = require('path');
const rimraf = require('rimraf');
const download = require('./download');

// 'https://codeload.github.com/scanlime/fadecandy/zip/package-02'
// 'https://github.com/scanlime/fadecandy/archive/package-02.zip'

rimraf('fcserver', {}, () => {
  download('https://codeload.github.com/scanlime/fadecandy/zip/package-02', path.join(process.cwd(), 'fcserver'))
    .then((result) => {
      // eslint-disable-next-line no-console
      console.info(`Downloaded fadecandy-server executable: "${result}"`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(-1);
    });
});
