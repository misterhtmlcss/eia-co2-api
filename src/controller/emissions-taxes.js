const { getDataForPeriod } = require("../helpers/fetch");

const emissionsTax = async (req, res) => {
  try {
    const { startYear, endYear, state } = req.query;
    const { codex, capitalize, findStateCode } = res.locals;
    const label = findStateCode(state, codex);

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

    const totalEmissions = emissionAnalysis.reduce((a, b) => a + b, 0);
    const tax = totalEmissions.toFixed(2);

    const results = {
      title: "tax calculator",
      quantity: totalEmissions,
      state: capitalize(state),
      startYear,
      endYear,
      tax,
    };
    return res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = emissionsTax;
