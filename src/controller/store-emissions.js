const { getData, findChosenStates } = require("../helpers/fetch");
const { createResults } = require("../services");

const storeEmissions = async (req, res) => {
  try {
    const { codex } = res.locals;
    const queryData = Object.values(req.query);
    const states = queryData.splice(0, queryData.length - 1);

    const results = await findChosenStates(states, codex, getData);

    res.json({
      message: "Successfully written to the database",
      payload: await createResults(results),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = storeEmissions;
