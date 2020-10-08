require("dotenv").config();

// Express
const express = require("express");
const app = express();

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

const stateCheck = require("./routes/state-check");
const taxCalculator = require("./routes/tax-calculator");
const saveData = require("./routes/save-data");
// const findHighestCO2Emitter = require('./routes/find-highest-co2-emitter')()

const errorHandler = require("./helpers/error");

// Register api routes
// Single State Tax bill for a Period of time (Years)
// http://localhost:5000/tax?startYear=2003&endYear=2006&state=california
app.use("/tax", taxCalculator);

// Can find the electric power carbon dioxide emissions of coal of any state
// Single State Data
// http://localhost:5000/state?year=2000&state=california
app.use("/state", stateCheck);

// Push data to MongoDB
app.use("/save", saveData);

// Find highest Emitter in a group.
// app.use('/find-highest', findHighestCO2Emitter)

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// Basic Error handler
app.use(errorHandler);

if (process.env.NODE_ENV !== "prod") {
  // ---- Start: For development ----
  // TODO: Should add the ability to write this to a file
  const logger = require("./helpers/logger");
  app.use(logger);
  // ---- End: For development ----
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error("error", err);
    return;
  }
  process.env.NODE_ENV !== "prod"
    ? console.log(`Listing on port.... http://localhost:${PORT}`)
    : null;
});
