// /state-check
// http://localhost:5000/state?year=2000&state=california
const stateCheck = (
  API_KEY,
  axios,
  router,
  codex,
  findStateCode,
  getDataForYear,
  capitalize
) => {
  return router.get("/state-check", async (req, res, next) => {
    try {
      const { year, state } = req.query;
      const label = findStateCode(state, codex);
      const url = `https://api.eia.gov/series/?api_key=${API_KEY}&series_id=EMISS.CO2-TOTV-EC-CO-${label}`;
      const { data } = await getDataForYear(year, state, "CO2", url, axios);

      // [ '2013', 0.593558 ]
      for (const [key, value] of data) {
        if (key === year) {
          const results = {
            title: "state check",
            quantity: value,
            state: capitalize(state),
            year,
            tax: 0,
          };
          return res.status(200).json(results);
        }
      }
    } catch (err) {
      next(err);
      // res.status(500).json({message: "Error: Issue with State Check"})
    }
  });
};

module.exports = stateCheck;
