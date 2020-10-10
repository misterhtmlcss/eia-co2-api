const { getDataForYear } = require("../helpers/fetch");

const emissionsSum = async (req, res) => {
  try {
    const { year, state } = req.query;
    const { codex, capitalize, findStateCode } = res.locals;
    const label = findStateCode(state, codex);

    if (!label || !state) {
      return res.status(400).json({ message: `No state found in the codex` });
    }

    const { data } = await getDataForYear(year, state, label);

    // [ '2013', 0.593558 ]
    for (const [key, value] of data) {
      if (key === year) {
        const results = {
          title: "state check",
          quantity: Number(value.toFixed(2)),
          state: capitalize(state),
          year: Number(year),
        };
        return res.status(200).json({
          message: "Successfully received the data from EIA API",
          payload: results,
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = emissionsSum;
