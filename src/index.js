const express = require("express");
const path = require('path')
const axios = require('axios');
const app = express();
const router = require('express').Router()

// LOAD KEYS
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// KEYS
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

// Template setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname + '/views'))
app.use('/static', express.static('public'))


// Helper functions
const codex = require('./helpers/state-list')
const findStateCode = require('./helpers/find-state-code')
const { getDataForYear, getDataForPeriod } = require('./helpers/fetch')
const capitalize = require('./helpers/capitalize');
const errorHandler = require('./helpers/error')




const stateCheck = require('./routes/state-check')(API_KEY , axios, router, codex, findStateCode, getDataForYear,  capitalize)
const taxCalculator = require('./routes/tax-calculator')(API_KEY , axios, router, codex, findStateCode, getDataForPeriod,  capitalize)



// Single State Tax bill for a Period of time (Years)
// http://localhost:5000/tax?startYear=2003&endYear=2006&state=california
app.use('/tax', taxCalculator)

// Can find the electric power carbon dioxide emissions of coal of any state
// Single State Data
// http://localhost:5000/?year=2000&state=california
app.use('/state', stateCheck)


app.use(errorHandler)

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));