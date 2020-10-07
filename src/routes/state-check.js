const router = require("express").Router();
const { getDataForYear } = require("../helpers/fetch");

// /state-check
// http://localhost:3000/state?year=2000&state=california

router.get("/", async (req, res, next) => {
  try {
    const { year, state } = req.query;
    const { codex, capitalize, findStateCode } = res.locals;
    const label = findStateCode(state, codex);

    const { data } = await getDataForYear(year, state, label);

    // [ '2013', 0.593558 ]
    for (const [key, value] of data) {
      if (key === year) {
        const results = {
          title: "state check",
          quantity: value,
          state: capitalize(state),
          year,
        };
        return res.status(200).json(results);
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
