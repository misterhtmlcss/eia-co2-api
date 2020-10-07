const router = require("express").Router();
const { getData, findChosenStates } = require("../helpers/fetch");
// const { client } = require("../connect/db");
const { createResults } = require("../services");

// Route
// http://localhost:3000/save/test?states=alabama
router.get("/", async (req, res, next) => {
  try {
    const { codex } = res.locals;
    const queryData = Object.values(req.query);
    const states = queryData.splice(0, queryData.length - 1);

    const results = await findChosenStates(states, codex, getData);

    await createResults(results);

    res.status(200).json({
      message: "Successfully written to the database",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
