// see: https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling

// eslint-disable-next-line no-unused-vars
const mwError = (error, req, res, next) => {
  console.log(error.message);
  res.status(500);
  res.send(error.stack);
};

module.exports = mwError;
