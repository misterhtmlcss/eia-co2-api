const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const app = express();

process.env.NODE_ENV !== "prod" && app.use(morgan("dev"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.locals = {
    codex: require("./helpers/state-list"),
    capitalize: require("./helpers/capitalize"),
    findStateCode: require("./helpers/find-state-code"),
  };
  next();
});

const {
  stateCheck,
  taxCalculator,
  saveData,
  getLocalData,
} = require("./routes/api");
// Register api routes
// Can find the electric power carbon dioxide emissions of coal of any state
app.use("/api/v1/state", stateCheck);
// Single State Tax bill for a Period of time (Years)
app.use("/api/v1/tax", taxCalculator);
// Push data to MongoDB
app.use("/api/v1/save", saveData);

// Get pushed data from MongoDB
app.use("/api/v1/local", getLocalData);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res
    .status(err.status || 500)
    .json({ message: "You have generated an error, good luck debugging it!" });
});

module.exports = app;
