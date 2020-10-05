module.exports = function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  // TODO: add a pug template for errors
  res.status(500).send("error handler");
};
