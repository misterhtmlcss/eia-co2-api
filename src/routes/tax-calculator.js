// /tax
// http://localhost:5000/tax?startYear=2003&endYear=2006&state=california
const taxCalculator = (
  API_KEY,
  axios,
  router,
  codex,
  findStateCode,
  getDataForPeriod,
  capitalize
) => {
  return router.get("/", async (req, res, next) => {
    try {
      const { startYear, endYear, state } = req.query;

      const label = findStateCode(state, codex);

      const url = `https://api.eia.gov/series/?api_key=${API_KEY}&series_id=EMISS.CO2-TOTV-EC-CO-${label}`;

      const { data } = await getDataForPeriod(
        startYear,
        endYear,
        state,
        "CO2",
        url,
        axios
      );

      // I do assume the endYear is greater than the startYear
      let count = Math.abs(endYear - startYear);

      let emissionAnalysis = [];
      // [ '2013', 0.593558 ]
      for (const [year, emission] of data) {
        if (year === endYear) {
          emissionAnalysis.push(emission);
          count--;
        }
        if (year >= startYear && year < endYear) {
          emissionAnalysis.push(emission);
          count--;
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
};

module.exports = taxCalculator;
