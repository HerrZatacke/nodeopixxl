const SecondaryServers = require('./middlewares/secondaryServers');

module.exports = (devMode) => (app) => {

  const secondaryServers = new SecondaryServers({ devMode });

  app.use('/secondaryServers', secondaryServers.middleware);
};
