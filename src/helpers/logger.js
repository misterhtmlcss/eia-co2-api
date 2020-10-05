module.exports = (req, res, next) => {
  console.log(
    `\n
    ${req.protocol}://${req.get("host")}${req.originalUrl} - ${Date()}
    \n`
  );
  console.log(`${req.url}\n`);
  next();
};
