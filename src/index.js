// Core libraries
const path = require("path");
const axios = require("axios");

// Express
const express = require("express");
const app = express();
const router = require("express").Router();

// LOAD KEYS
if (process.env.NODE_ENV !== "prod") {
  // ---- Start: For testing ----
  // TODO: Should add the ability to write this to a file
  const logger = require("./helpers/logger");
  app.use(logger);
  // ---- End: For testing ----

  require("dotenv").config();
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
const codex = require("./helpers/state-list");
const findStateCode = require("./helpers/find-state-code");
const { getDataForYear, getDataForPeriod, getData } = require("./helpers/fetch");
const capitalize = require("./helpers/capitalize");
const errorHandler = require("./helpers/error");

// Mongo DB connection
require("./connect/db")();

// Routes
// State CO2 data
const stateCheck = require("./routes/state-check")(
  API_KEY,
  axios,
  router,
  codex,
  findStateCode,
  getDataForYear,
  capitalize
);

// Calculate total tax owing
const taxCalculator = require("./routes/tax-calculator")(
  API_KEY,
  axios,
  router,
  codex,
  findStateCode,
  getDataForPeriod,
  capitalize
);

// Publish to Database
const saveData = require("./routes/save-data")(
  API_KEY,
  axios,
  router,
  codex,
  findStateCode,
  getData,
  capitalize
);

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
