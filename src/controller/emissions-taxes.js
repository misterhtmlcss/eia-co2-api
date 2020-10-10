const { getDataForPeriod } = require("../helpers/fetch");

const emissionsTax = async (req, res) => {
  try {
    const { startYear, endYear, state } = req.query;
    const { codex, capitalize, findStateCode } = res.locals;
    const label = findStateCode(state, codex);

    if (!label || !state) {
      return res.status(400).json({ message: `No state found in the codex` });
    }

    const { data } = await getDataForPeriod(startYear, endYear, state, label);

    let emissionAnalysis = [];
    // [ '2013', 0.593558 ]
    for (const [year, emission] of data) {
      if (year === endYear) {
        emissionAnalysis.push(emission);
      }
      if (year >= startYear && year < endYear) {
        emissionAnalysis.push(emission);
      }
    }

    // TODO: Need a check for bad data and returned

    const totalEmissions = emissionAnalysis
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
    const tax = `You paid $${totalEmissions} million dollars in carbon taxes`;

    const results = {
      title: "CO2 Tax Paid Calculator",
      quantity: Number(totalEmissions),
      state: capitalize(state),
      startYear: Number(startYear),
      endYear: Number(endYear),
      tax,
    };

    return res.status(200).json({
      message: "Successfully received the data from EIA API",
      payload: results,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = emissionsTax;
