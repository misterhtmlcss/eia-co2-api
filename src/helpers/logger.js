module.exports = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl} - ${Date()}`
  );
  next();
};
