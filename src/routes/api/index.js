// Routes
module.exports = {
  // State CO2 data
  stateCheck: require("./v1/state-check"),

  // Calculate total tax owing
  taxCalculator: require("./v1/tax-calculator"),

  // Publish to Database
  saveData: require("./v1/save-data"),

  getLocalData: require("./v1/get-data"),
};
