const router = require("express").Router();
const { getDataForPeriod } = require("../helpers/fetch");
// /tax
// http://localhost:3000/tax?startYear=2003&endYear=2006&state=california

router.get("/", async (req, res, next) => {
  try {
    const { startYear, endYear, state } = req.query;
    const { codex, capitalize, findStateCode } = res.locals;
    const label = findStateCode(state, codex);

    const { data } = await getDataForPeriod(
      startYear,
      endYear,
      state,
      "CO2",
      label
    );

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
    const totalTax = totalEmissions.toFixed(2);

    const results = {
      title: "tax calculator",
      quantity: totalEmissions,
      state: capitalize(state),
      year: endYear,
      tax: totalTax,
    };

    return res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
