const path = require("path");

// Express
const express = require("express");
const app = express();

require("dotenv").config();

// LOAD KEYS
if (process.env.NODE_ENV !== "prod") {
  // ---- Start: For testing ----
  // TODO: Should add the ability to write this to a file
  const logger = require("./helpers/logger");
  app.use(logger);
  // ---- End: For testing ----


}

// KEYS
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

// Template setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname + "/views"));

// Helper functions
// const codex =
// const findStateCode =
// const capitalize =
const { getDataForYear, getDataForPeriod, getData } = require("./helpers/fetch");
const errorHandler = require("./helpers/error");

app.use(function (req, res, next) {
  res.locals = {
    codex: require("./helpers/state-list"),
    capitalize: require("./helpers/capitalize"),
    findStateCode: require("./helpers/find-state-code"),
  }
  next()
})


// Mongo DB connection
require("./connect/db")();

// Routes
// State CO2 data
const stateCheck = require("./routes/state-check")(API_KEY, getDataForYear);

// Calculate total tax owing
const taxCalculator = require("./routes/tax-calculator")(API_KEY, getDataForPeriod);

// Publish to Database
const saveData = require("./routes/save-data")(API_KEY, getData);

// Find highest CO2 Emitter
// const findHighestCO2Emitter = require('./routes/find-highest-co2-emitter')(API_KEY, axios, router, codex, findStateCode, getDataForYear, capitalize)

// Single State Tax bill for a Period of time (Years)
// http://localhost:5000/tax?startYear=2003&endYear=2006&state=california
app.use("/tax", taxCalculator);

// Can find the electric power carbon dioxide emissions of coal of any state
// Single State Data
// http://localhost:5000/state?year=2000&state=california
app.use("/state", stateCheck);

app.use("/save", saveData);

// app.use('/find-highest', findHighestCO2Emitter)

// Basic Error handler
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.error("error", err);
    return;
  }
  console.log(`Listing on port.... http://localhost:${PORT}`);
});
