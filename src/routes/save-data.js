const router = require("express").Router();
const { getData, findChosenStates } = require("../helpers/fetch");

// Route
// http://localhost:3000/save/test?states=alabama
router.get("/", async (req, res, next) => {
  try {
    const { codex } = res.locals;
    const queryData = Object.values(req.query);
    const states = queryData.splice(0, queryData.length - 1);

    const results = await findChosenStates(states, codex);
    const statesData = await Promise.all(
      results.map(async (state) => {
        return await getData("CO2", state);
      })
    );
    return res.status(200).json(statesData);
  } catch (err) {
    // return res.status(500).json({ message: "Error!!!" });
    next(err);
  }
});

module.exports = router;
