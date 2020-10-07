const router = require("express").Router();
const { getDataForYear } = require("../helpers/fetch");

// /state-check
// http://localhost:3000/state?year=2000&state=california

router.get("/", async (req, res, next) => {
  try {
    const { year, state } = req.query;
    const { codex, capitalize, findStateCode } = res.locals;
    const label = findStateCode(state, codex);

    const { data } = await getDataForYear(year, state, "CO2", label);

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

module.exports = router;
